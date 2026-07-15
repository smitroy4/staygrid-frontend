import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Menu, X, User, LogOut, LayoutDashboard, CalendarDays, Users } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Role } from '../../types'

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-surface-800 border-b border-surface-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-brand-500 hover:text-brand-400 transition-colors">
            <Building2 className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight">StayGrid</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-surface-200 hover:text-white transition-colors text-sm font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/my-bookings" className="text-surface-200 hover:text-white transition-colors text-sm font-medium">
                  My Bookings
                </Link>
                {hasRole(Role.HOTEL_MANAGER) && (
                  <Link to="/admin" className="text-surface-200 hover:text-white transition-colors text-sm font-medium">
                    Dashboard
                  </Link>
                )}
              </>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm text-surface-200 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  {user?.name || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-surface-200 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-surface-200 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface-800 border-t border-surface-700">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-surface-200 hover:text-white" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/my-bookings" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                  <CalendarDays className="w-4 h-4 inline mr-2" />My Bookings
                </Link>
                <Link to="/my-guests" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                  <Users className="w-4 h-4 inline mr-2" />My Guests
                </Link>
                <Link to="/profile" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                  <User className="w-4 h-4 inline mr-2" />Profile
                </Link>
                {hasRole(Role.HOTEL_MANAGER) && (
                  <Link to="/admin" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                    <LayoutDashboard className="w-4 h-4 inline mr-2" />Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="block text-brand-400 hover:text-brand-300 w-full text-left py-1.5">
                  <LogOut className="w-4 h-4 inline mr-2" />Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="block text-brand-400 hover:text-brand-300 py-1.5" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
