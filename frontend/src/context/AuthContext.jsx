import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    return token ? { token, username } : null
  })

  const login = async (username, password) => {
    const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password })
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('username', username)
    setUser({ token: res.data.access, username })
  }

  const register = async (username, email, password) => {
    await axios.post('http://127.0.0.1:8000/api/auth/register/', { username, email, password })
    await login(username, password)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)