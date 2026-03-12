from django.db import models
from django.contrib.auth.models import User

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    icono = models.CharField(max_length=10, default='🎂')
    imagen = models.ImageField(upload_to='categorias/', blank=True, null=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Categorías"


class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField(default=10)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    imagen_url = models.URLField(blank=True, null=True)
    destacado = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ['-creado_en']


class Orden(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('pagado', 'Pagado'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ordenes')
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pagado')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Orden #{self.id} - {self.usuario.username}'


class OrdenItem(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f'{self.producto.nombre} x{self.cantidad}'