from django.contrib import admin
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['icono', 'nombre', 'descripcion']
    search_fields = ['nombre']


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'stock', 'destacado']
    list_filter = ['categoria', 'destacado']
    search_fields = ['nombre', 'descripcion']
    list_editable = ['precio', 'stock', 'destacado']