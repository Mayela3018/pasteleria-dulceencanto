from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CategoriaViewSet, ProductoViewSet, register, historial, crear_orden, crear_payment_intent

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('ordenes/', crear_orden, name='crear_orden'),
    path('ordenes/historial/', historial, name='historial'),
    path('pagos/crear-intent/', crear_payment_intent, name='crear_intent'),
]