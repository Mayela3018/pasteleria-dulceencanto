import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Historial from './pages/Historial'
import { CarritoProvider } from './context/CarritoContext'
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CarritoProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/historial" element={<Historial />} />
            </Routes>
          </BrowserRouter>
        </CarritoProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}