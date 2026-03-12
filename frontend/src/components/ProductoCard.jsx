import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

export default function ProductoCard({ producto }) {
  const { agregar } = useCarrito()
  const imagen = producto.imagen_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,157,0.25)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}
    >
      <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img src={imagen} alt={producto.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {producto.destacado && (
            <span style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
              color: 'white', padding: '4px 10px', borderRadius: '20px',
              fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Nunito, sans-serif',
            }}>⭐ Destacado</span>
          )}
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 style={{
            margin: '0 0 6px', fontFamily: "'Playfair Display', serif",
            fontSize: '1rem', color: '#2d2d2d', lineHeight: 1.3,
          }}>{producto.nombre}</h3>
          <p style={{
            margin: '0 0 12px', fontSize: '0.8rem', color: '#888',
            fontFamily: 'Nunito, sans-serif', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{producto.descripcion}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
              fontWeight: 700, color: '#ff6b9d',
            }}>S/ {parseFloat(producto.precio).toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div style={{ padding: '0 1rem 1rem' }}>
        <button onClick={() => agregar(producto)} style={{
          width: '100%', padding: '10px',
          background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
          color: 'white', border: 'none', borderRadius: '12px',
          fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >🛒 Agregar al carrito</button>
      </div>
    </div>
  )
}