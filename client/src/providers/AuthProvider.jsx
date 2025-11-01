import React from 'react'
import axios from 'axios'

export const AuthContext = React.createContext(null)

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', withCredentials: true })

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    api.get('/api/auth/me').then(r => setUser(r.data)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const r = await api.post('/api/auth/login', { email, password })
    setUser(r.data)
    return r.data
  }
  const signup = async (email, password, name) => {
    const r = await api.post('/api/auth/signup', { email, password, name })
    setUser(r.data)
    return r.data
  }
  const logout = async () => {
    await api.post('/api/auth/logout')
    setUser(null)
  }

  const value = { user, loading, login, signup, logout, api }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
