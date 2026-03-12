import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import axios from 'axios'

export default function Carrito() {
  const { items, quitar, cambiarCantidad, total, totalItems, setItems } = useCarrito()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [pagando, setPagando] = useState(false)
  const [exito, setExito] = useState(false)

  const handlePagar = async () => {
    if (!user) return navigate('/login')
    setPagando(true)
    try {
      await axios.post('http://127.0.0.1:8000/api/ordenes/', {
        items: items.map(i => ({ id: i.id, cantidad: i.cantidad }))
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setExito(true)
      setTimeout(() => {
        setItems([])
        navigate('/historial')
      }, 2500)
    } catch (err) {
      alert(err.response?.data?.items || 'Error al procesar el pago')
    } finally {
      setPagando(false)
    }
  }

  if (exito) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#fff9f5', fontFamily: 'Nunito',
    }}>
      <div style={{ fontSize: '5rem' }}>✅</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#4caf50' }}>¡Pago exitoso!</h2>
      <p style={{ color: '#aaa' }}>Redirigiendo a tu historial...</p>
    </div>
  )

  if (items.length === 0) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#fff9f5', fontFamily: 'Nunito',
    }}>
      <div style={{ fontSize: '5rem' }}>🛒</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2d2d2d', marginBottom: '0.5rem' }}>
        Tu carrito está vacío
      </h2>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>¡Agrega algunos dulces deliciosos!</p>
      <Link to="/" style={{
        padding: '14px 32px', borderRadius: '50px', border: 'none',
        background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
        color: 'white', textDecoration: 'none',
        fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem',
      }}>🎂 Ver productos</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff9f5', fontFamily: 'Nunito', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#2d2d2d', marginBottom: '2rem' }}>
          🛒 Tu Carrito <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 400 }}>({totalItems} items)</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{
                background: 'white', borderRadius: '20px', padding: '1.2rem',
                display: 'flex', gap: '1rem', alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <img src={item.imagen_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'}
                  alt={item.nombre}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px', fontFamily: "'Playfair Display', serif", fontSize: '1rem' }}>{item.nombre}</h3>
                  <p style={{ margin: 0, color: '#ff6b9d', fontWeight: 700 }}>S/ {parseFloat(item.precio).toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} style={{
                    width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                    background: '#f0f0f0', cursor: 'pointer', fontWeight: 700,
                  }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.cantidad}</span>
                  <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} style={{
                    width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                    background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
                    color: 'white', cursor: 'pointer', fontWeight: 700,
                  }}>+</button>
                </div>
                <div style={{ minWidth: '80px', textAlign: 'right' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 700 }}>S/ {(parseFloat(item.precio) * item.cantidad).toFixed(2)}</p>
                  <button onClick={() => quitar(item.id)} style={{
                    background: 'none', border: 'none', color: '#ff6b9d', cursor: 'pointer', fontSize: '0.8rem',
                  }}>🗑️ Quitar</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'white', borderRadius: '24px', padding: '1.5rem',
            boxShadow: '0 8px 40px rgba(255,107,157,0.15)', position: 'sticky', top: '90px',
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", margin: '0 0 1.2rem', fontSize: '1.3rem' }}>📋 Resumen</h3>
            <div style={{ borderTop: '1px dashed #ffd6e7', paddingTop: '1rem', marginBottom: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>
                  <span>{item.nombre} x{item.cantidad}</span>
                  <span>S/ {(parseFloat(item.precio) * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #ffd6e7', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#ff6b9d' }}>
                S/ {total.toFixed(2)}
              </span>
            </div>

            {!user && (
              <div style={{ background: '#fff0f5', borderRadius: '12px', padding: '12px', marginBottom: '1rem', fontSize: '0.85rem', color: '#ff6b9d', textAlign: 'center' }}>
                🔐 Debes iniciar sesión para pagar
              </div>
            )}

            <button onClick={handlePagar} disabled={pagando} style={{
              width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
              color: 'white', fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
              marginBottom: '10px', opacity: pagando ? 0.7 : 1,
            }}>
              {pagando ? '⏳ Procesando...' : user ? '💳 Pagar ahora' : '🔐 Iniciar sesión para pagar'}
            </button>
            <Link to="/" style={{ display: 'block', textAlign: 'center', color: '#ff6b9d', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}