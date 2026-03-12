import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducto } from '../services/api'
import { useCarrito } from '../context/CarritoContext'
import { useState } from 'react'

export default function DetalleProducto() {
  const { id } = useParams()
  const { agregar } = useCarrito()
  const [agregado, setAgregado] = useState(false)

  const { data: producto, isLoading } = useQuery({
    queryKey: ['producto', id],
    queryFn: () => getProducto(id),
  })

  const handleAgregar = () => {
    agregar(producto)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '6rem', fontSize: '2rem' }}>🎂 Cargando...</div>
  )

  if (!producto) return (
    <div style={{ textAlign: 'center', padding: '6rem' }}>
      <div style={{ fontSize: '3rem' }}>😕</div>
      <p>Producto no encontrado</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )

  const imagen = producto.imagen_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'

  return (
    <div style={{ minHeight: '100vh', background: '#fff9f5', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

        {/* BREADCRUMB */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#aaa' }}>
          <Link to="/" style={{ color: '#ff6b9d', textDecoration: 'none', fontWeight: 700 }}>🏠 Inicio</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>{producto.nombre}</span>
        </div>

        <div style={{
          background: 'white', borderRadius: '24px',
          overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
        }}>
          {/* IMAGEN */}
          <div style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
            <img src={imagen} alt={producto.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {producto.destacado && (
              <span style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
                color: 'white', padding: '6px 14px', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: 700,
              }}>⭐ Producto Destacado</span>
            )}
          </div>

          {/* INFO */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem', color: '#2d2d2d', margin: '0 0 1rem', lineHeight: 1.3,
            }}>{producto.nombre}</h1>

            <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1rem' }}>
              {producto.descripcion}
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #fff0f5, #fff5e6)',
              borderRadius: '16px', padding: '1.2rem', marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '4px' }}>Precio</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2rem', fontWeight: 700, color: '#ff6b9d',
                  }}>S/ {parseFloat(producto.precio).toFixed(2)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '4px' }}>Stock</div>
                  <div style={{
                    fontWeight: 700, fontSize: '1.1rem',
                    color: producto.stock > 5 ? '#4caf50' : '#ff9800',
                  }}>
                    {producto.stock > 0 ? `${producto.stock} disponibles` : '😕 Agotado'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAgregar}
              disabled={producto.stock === 0}
              style={{
                padding: '16px', borderRadius: '16px', border: 'none',
                background: agregado ? '#4caf50' : 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
                color: 'white', fontFamily: 'Nunito, sans-serif',
                fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                transition: 'all 0.3s', marginBottom: '12px',
                boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
              }}>
              {agregado ? '✅ ¡Agregado al carrito!' : '🛒 Agregar al carrito'}
            </button>

            <Link to="/carrito" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              borderRadius: '16px', border: '2px solid #ff6b9d',
              color: '#ff6b9d', textDecoration: 'none',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700,
              transition: 'all 0.2s',
            }}>Ver carrito 🛒</Link>
          </div>
        </div>
      </div>
    </div>
  )
}