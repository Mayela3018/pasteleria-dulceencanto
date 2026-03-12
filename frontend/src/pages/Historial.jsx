import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Historial() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: ordenes = [], isLoading } = useQuery({
    queryKey: ['historial'],
    queryFn: () => axios.get('http://127.0.0.1:8000/api/ordenes/historial/', {
      headers: { Authorization: `Bearer ${user?.token}` }
    }).then(r => r.data),
    enabled: !!user,
  })

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '6rem', fontFamily: 'Nunito' }}>
      <div style={{ fontSize: '3rem' }}>🔒</div>
      <p>Debes iniciar sesión para ver tu historial</p>
      <button onClick={() => navigate('/login')} style={{
        padding: '12px 24px', borderRadius: '50px', border: 'none',
        background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
        color: 'white', fontFamily: 'Nunito', fontWeight: 700, cursor: 'pointer',
      }}>Iniciar sesión</button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff9f5', padding: '2rem', fontFamily: 'Nunito' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#2d2d2d', marginBottom: '2rem' }}>
          📋 Historial de compras
        </h1>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', fontSize: '2rem' }}>🎂 Cargando...</div>
        ) : ordenes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
            <div style={{ fontSize: '3rem' }}>📭</div>
            <p>Aún no tienes compras realizadas</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ordenes.map(orden => (
              <div key={orden.id} style={{
                background: 'white', borderRadius: '20px', padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontFamily: "'Playfair Display', serif" }}>
                      Orden #{orden.id}
                    </h3>
                    <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>
                      {new Date(orden.creado_en).toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      background: '#e8f5e9', color: '#4caf50', padding: '4px 12px',
                      borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                    }}>✅ {orden.estado}</span>
                    <div style={{
                      fontFamily: "'Playfair Display', serif", fontSize: '1.3rem',
                      color: '#ff6b9d', fontWeight: 700, marginTop: '4px',
                    }}>S/ {parseFloat(orden.total).toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed #ffd6e7', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {orden.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                      <span>{item.producto_nombre} x{item.cantidad}</span>
                      <span>S/ {(parseFloat(item.precio_unitario) * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}