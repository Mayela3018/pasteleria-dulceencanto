import axios from 'axios'

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' })

export const getCategorias = () => api.get('/categorias/').then(r => {
  const data = r.data
  if (Array.isArray(data)) return data
  if (data.results) return data.results
  return []
})

export const getProductos = (params) => api.get('/productos/', { params }).then(r => {
  const data = r.data
  if (Array.isArray(data)) return data
  if (data.results) return data.results
  return []
})

export const getProducto = (id) => api.get(`/productos/${id}/`).then(r => r.data)
export const getDestacados = () => api.get('/productos/destacados/').then(r => r.data)