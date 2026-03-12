from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Categoria, Producto, Orden, OrdenItem


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    productos = ProductoSerializer(many=True, read_only=True)
    total_productos = serializers.SerializerMethodField()

    def get_total_productos(self, obj):
        return obj.productos.count()

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion', 'icono', 'imagen', 'total_productos', 'productos']


class CategoriaSimpleSerializer(serializers.ModelSerializer):
    total_productos = serializers.SerializerMethodField()

    def get_total_productos(self, obj):
        return obj.productos.count()

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion', 'icono', 'imagen', 'total_productos']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class OrdenItemSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    producto_imagen = serializers.CharField(source='producto.imagen_url', read_only=True)

    class Meta:
        model = OrdenItem
        fields = ['id', 'producto', 'producto_nombre', 'producto_imagen', 'cantidad', 'precio_unitario']


class OrdenSerializer(serializers.ModelSerializer):
    items = OrdenItemSerializer(many=True, read_only=True)

    class Meta:
        model = Orden
        fields = ['id', 'estado', 'total', 'creado_en', 'items']


class CrearOrdenSerializer(serializers.Serializer):
    items = serializers.ListField(child=serializers.DictField())

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("El carrito está vacío")
        for item in items:
            try:
                producto = Producto.objects.get(id=item['id'])
                if producto.stock < int(item['cantidad']):
                    raise serializers.ValidationError(f"Stock insuficiente para {producto.nombre}")
            except Producto.DoesNotExist:
                raise serializers.ValidationError(f"Producto {item['id']} no existe")
        return items