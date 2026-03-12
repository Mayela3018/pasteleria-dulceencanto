from rest_framework import viewsets, filters, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from django.conf import settings
from .models import Categoria, Producto, Orden, OrdenItem
from .serializers import (
    CategoriaSerializer, CategoriaSimpleSerializer, ProductoSerializer,
    RegisterSerializer, OrdenSerializer, CrearOrdenSerializer
)
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return CategoriaSimpleSerializer
        return CategoriaSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria', 'destacado']
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['precio', 'creado_en', 'nombre']

    @action(detail=False, methods=['get'])
    def destacados(self, request):
        destacados = Producto.objects.filter(destacado=True)
        serializer = self.get_serializer(destacados, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'mensaje': 'Usuario creado correctamente'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def historial(request):
    ordenes = Orden.objects.filter(usuario=request.user).order_by('-creado_en')
    serializer = OrdenSerializer(ordenes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_orden(request):
    serializer = CrearOrdenSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    items = serializer.validated_data['items']
    total = 0
    orden = Orden.objects.create(usuario=request.user, total=0, estado='pagado')

    for item in items:
        producto = Producto.objects.get(id=item['id'])
        cantidad = int(item['cantidad'])
        precio = producto.precio

        OrdenItem.objects.create(
            orden=orden,
            producto=producto,
            cantidad=cantidad,
            precio_unitario=precio,
        )
        producto.stock -= cantidad
        producto.save()
        total += precio * cantidad

    orden.total = total
    orden.save()

    return Response(OrdenSerializer(orden).data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_payment_intent(request):
    try:
        items = request.data.get('items', [])
        total = 0
        for item in items:
            producto = Producto.objects.get(id=item['id'])
            total += int(producto.precio * 100) * int(item['cantidad'])

        intent = stripe.PaymentIntent.create(
            amount=total,
            currency='pen',
            metadata={'usuario': request.user.username}
        )
        return Response({'client_secret': intent.client_secret})
    except Exception as e:
        return Response({'error': str(e)}, status=400)