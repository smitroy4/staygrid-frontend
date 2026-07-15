import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Menu, X, User, LogOut, LayoutDashboard, CalendarDays, Users, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Role } from '../../types'

const moreLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
  { to: '/press', label: 'Press' },
  { to: '/help', label: 'Help Center' },
  { to: '/cancellation', label: 'Cancellation' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 text-surface-200 hover:text-white transition-colors text-sm font-medium"
              >
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface-800 border border-surface-700 rounded-xl py-2 shadow-xl">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-surface-200 hover:text-white hover:bg-surface-700 transition-colors"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
            <div className="border-t border-surface-700 pt-3">
              <p className="text-xs text-surface-500 uppercase tracking-wider mb-2 px-1">Information</p>
              {moreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-surface-200 hover:text-white py-1.5"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {isAuthenticated ? (
              <>
                <div className="border-t border-surface-700 pt-3">
                  <p className="text-xs text-surface-500 uppercase tracking-wider mb-2 px-1">Account</p>
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
                </div>
              </>
            ) : (
              <div className="border-t border-surface-700 pt-3">
                <p className="text-xs text-surface-500 uppercase tracking-wider mb-2 px-1">Account</p>
                <Link to="/login" className="block text-surface-200 hover:text-white py-1.5" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="block text-brand-400 hover:text-brand-300 py-1.5" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
