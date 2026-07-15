import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { Role } from '../../types'
import LoadingSpinner from './LoadingSpinner'

interface Props {
  children: React.ReactNode
  roles?: Role[]
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { isAuthenticated, loading, hasRole } = useAuth()

  if (loading) return <LoadingSpinner fullPage text="Loading..." />

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (roles && !roles.some((r) => hasRole(r))) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
