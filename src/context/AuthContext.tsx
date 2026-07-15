import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import * as authApi from '../api/auth'
import * as usersApi from '../api/users'
import type { UserDto, SignUpRequest, LoginRequest, Role } from '../types'

interface JwtPayload {
  sub: string
  email: string
  roles: string[]
  exp: number
}

interface AuthContextType {
  user: UserDto | null
  loading: boolean
  isAuthenticated: boolean
  roles: Role[]
  hasRole: (role: Role) => boolean
  login: (data: LoginRequest) => Promise<void>
  signup: (data: SignUpRequest) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null)
  const [loading, setLoading] = useState(true)

  const getRoles = (): Role[] => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) return []
      const decoded = jwtDecode<JwtPayload>(token)
      return (decoded.roles || []) as Role[]
    } catch {
      return []
    }
  }

  const refreshUser = useCallback(async () => {
    try {
      const profile = await usersApi.getProfile()
      setUser(profile)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token)
          if (decoded.exp * 1000 < Date.now()) {
            try {
              const res = await authApi.refreshToken()
              localStorage.setItem('accessToken', res.accessToken)
            } catch {
              localStorage.removeItem('accessToken')
              setLoading(false)
              return
            }
          }
          await refreshUser()
        } catch {
          localStorage.removeItem('accessToken')
        }
      }
      setLoading(false)
    }
    init()
  }, [refreshUser])

  const login = async (data: LoginRequest) => {
    const res = await authApi.login(data)
    localStorage.setItem('accessToken', res.accessToken)
    await refreshUser()
  }

  const signup = async (data: SignUpRequest) => {
    await authApi.signup(data)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  const hasRole = (role: Role) => getRoles().includes(role)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        roles: getRoles(),
        hasRole,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
