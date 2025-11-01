import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider.jsx'
import { LinearProgress, Box } from '@mui/material'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return <Box sx={{ width: '100%' }}><LinearProgress /></Box>
  if (!user) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
