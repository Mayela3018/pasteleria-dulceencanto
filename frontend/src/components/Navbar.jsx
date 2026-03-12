import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { totalItems } = useCarrito()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8c42 50%, #ffd93d 100%)',
      padding: '0 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '70px',
      boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '2rem' }}>🎂</span>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>
            La Dulce
          </div>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>
            Tentación
          </div>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{
          textDecoration: 'none', color: 'white', fontFamily: 'Nunito, sans-serif',
          fontWeight: 700, fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px',
          background: pathname === '/' ? 'rgba(255,255,255,0.3)' : 'transparent',
        }}>🏠 Inicio</Link>

        {user && (
          <Link to="/historial" style={{
            textDecoration: 'none', color: 'white', fontFamily: 'Nunito, sans-serif',
            fontWeight: 700, fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px',
            background: pathname === '/historial' ? 'rgba(255,255,255,0.3)' : 'transparent',
          }}>📋 Historial</Link>
        )}

        <Link to="/carrito" style={{
          textDecoration: 'none', color: 'white', fontFamily: 'Nunito, sans-serif',
          fontWeight: 700, fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px',
          background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          🛒 Carrito
          {totalItems > 0 && (
            <span style={{
              background: '#fff', color: '#ff6b9d', borderRadius: '50%',
              width: '20px', height: '20px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800,
            }}>{totalItems}</span>
          )}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'white', fontFamily: 'Nunito', fontSize: '0.85rem', fontWeight: 700 }}>
              👋 {user.username}
            </span>
            <button onClick={handleLogout} style={{
              padding: '6px 14px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.5)',
              background: 'transparent', color: 'white', fontFamily: 'Nunito',
              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            }}>Salir</button>
          </div>
        ) : (
          <Link to="/login" style={{
            textDecoration: 'none', color: '#ff6b9d', fontFamily: 'Nunito',
            fontWeight: 800, fontSize: '0.9rem', padding: '6px 16px', borderRadius: '20px',
            background: 'white',
          }}>🔐 Ingresar</Link>
        )}
      </div>
    </nav>
  )
}