import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategorias, getProductos } from '../services/api'
import ProductoCard from '../components/ProductoCard'

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@700&family=Nunito:wght@400;600;700;800&display=swap');`

export default function Home() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const { data: categorias = [] } = useQuery({ queryKey: ['categorias'], queryFn: getCategorias })
  const { data: productosData, isLoading } = useQuery({
    queryKey: ['productos', categoriaActiva, busqueda],
    queryFn: () => getProductos({
      categoria: categoriaActiva || undefined,
      search: busqueda || undefined,
    }),
  })

const productos = Array.isArray(productosData) ? productosData : []
  return (
    <>
      <style>{GOOGLE_FONTS}</style>
      <div style={{ minHeight: '100vh', background: '#fff9f5', fontFamily: 'Nunito, sans-serif' }}>

        {/* HERO */}
        <div style={{
          background: 'linear-gradient(135deg, #fff0f5 0%, #fff5e6 50%, #fffbe6 100%)',
          padding: '4rem 2rem 3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-20px', left: '5%', fontSize: '4rem', opacity: 0.15, transform: 'rotate(-15deg)' }}>🎂</div>
          <div style={{ position: 'absolute', top: '10px', right: '8%', fontSize: '3rem', opacity: 0.15, transform: 'rotate(10deg)' }}>🧁</div>
          <div style={{ position: 'absolute', bottom: '0', left: '15%', fontSize: '3rem', opacity: 0.1, transform: 'rotate(-5deg)' }}>🍰</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '20%', fontSize: '2.5rem', opacity: 0.1 }}>🍫</div>

          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.3rem', color: '#ff6b9d', margin: '0 0 8px' }}>
            Bienvenido a
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#2d2d2d', margin: '0 0 1rem', lineHeight: 1.2,
          }}>
            La Dulce <span style={{ color: '#ff6b9d' }}>Tentación</span> 🎂
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Pasteles, cupcakes y más delicias hechas con amor para cada ocasión especial
          </p>

          {/* BUSCADOR */}
          <div style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
            <input
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="🔍 Buscar productos..."
              style={{
                width: '100%', padding: '14px 20px', borderRadius: '50px',
                border: '2px solid #ffd6e7', fontSize: '1rem', fontFamily: 'Nunito, sans-serif',
                outline: 'none', boxSizing: 'border-box', background: 'white',
                boxShadow: '0 4px 20px rgba(255,107,157,0.15)',
              }}
            />
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2d2d2d', marginBottom: '1rem' }}>
            🍰 Categorías
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button
              onClick={() => setCategoriaActiva(null)}
              style={{
                padding: '10px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                background: !categoriaActiva ? 'linear-gradient(135deg, #ff6b9d, #ff8c42)' : '#f0f0f0',
                color: !categoriaActiva ? 'white' : '#666',
                transition: 'all 0.2s',
                boxShadow: !categoriaActiva ? '0 4px 15px rgba(255,107,157,0.4)' : 'none',
              }}>
              ✨ Todos
            </button>
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id === categoriaActiva ? null : cat.id)}
                style={{
                  padding: '10px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                  background: categoriaActiva === cat.id ? 'linear-gradient(135deg, #ff6b9d, #ff8c42)' : '#f0f0f0',
                  color: categoriaActiva === cat.id ? 'white' : '#666',
                  transition: 'all 0.2s',
                  boxShadow: categoriaActiva === cat.id ? '0 4px 15px rgba(255,107,157,0.4)' : 'none',
                }}>
                {cat.icono} {cat.nombre}
              </button>
            ))}
          </div>

          {/* PRODUCTOS */}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2d2d2d', marginBottom: '1.5rem' }}>
            {categoriaActiva ? categorias.find(c => c.id === categoriaActiva)?.nombre : '🛍️ Todos los productos'}
            <span style={{ fontSize: '1rem', color: '#aaa', fontFamily: 'Nunito', fontWeight: 400, marginLeft: '12px' }}>
              ({productos.length} productos)
            </span>
          </h2>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '4rem', fontSize: '2rem' }}>🎂 Cargando delicias...</div>
          ) : productos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
              <div style={{ fontSize: '3rem' }}>🔍</div>
              <p>No se encontraron productos</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}>
              {productos.map(p => <ProductoCard key={p.id} producto={p} />)}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer style={{
          marginTop: '4rem', padding: '2rem',
          background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
          textAlign: 'center', color: 'white',
        }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', margin: '0 0 8px' }}>
            La Dulce Tentación 🎂
          </p>
          <p style={{ fontFamily: 'Nunito', fontSize: '0.9rem', opacity: 0.85, margin: 0 }}>
            Hecho con amor ❤️ para cada ocasión especial
          </p>
        </footer>
      </div>
    </>
  )
}