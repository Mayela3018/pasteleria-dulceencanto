import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      await register(form.username, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #fff0f5, #fff5e6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Nunito, sans-serif', padding: '2rem',
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '2.5rem',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(255,107,157,0.2)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧁</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2d2d2d', margin: '8px 0 4px' }}>
            Crear cuenta
          </h1>
          <p style={{ color: '#aaa', margin: 0 }}>Únete a La Dulce Tentación</p>
        </div>

        {error && (
          <div style={{
            background: '#fff0f5', border: '1px solid #ffb3d1', borderRadius: '12px',
            padding: '12px', marginBottom: '1rem', color: '#ff6b9d',
            fontSize: '0.9rem', textAlign: 'center',
          }}>⚠️ {error}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: '👤 Usuario', key: 'username', type: 'text', placeholder: 'Elige un nombre de usuario' },
            { label: '📧 Email', key: 'email', type: 'email', placeholder: 'tu@email.com' },
            { label: '🔒 Contraseña', key: 'password', type: 'password', placeholder: 'Mínimo 6 caracteres' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#555', display: 'block', marginBottom: '6px' }}>
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '2px solid #ffd6e7', fontSize: '1rem',
                  fontFamily: 'Nunito', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '14px', borderRadius: '16px', border: 'none',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
              color: 'white', fontFamily: 'Nunito', fontWeight: 800,
              fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem',
              boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
              opacity: loading ? 0.7 : 1,
            }}>
            {loading ? '⏳ Creando cuenta...' : '🎉 Crear cuenta'}
          </button>

          <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: '#ff6b9d', fontWeight: 700, textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}