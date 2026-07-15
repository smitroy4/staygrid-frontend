import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
      toast.success('Welcome back!')
      navigate('/')
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 text-brand-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-surface-400 text-sm mt-1">Sign in to your StayGrid account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-800 rounded-xl p-6 space-y-4 border border-surface-700">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-700 border border-surface-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-700 border border-surface-600 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-surface-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
