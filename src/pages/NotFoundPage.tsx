import { Link } from 'react-router-dom'
import { Building2, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <Building2 className="w-20 h-20 text-brand-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-xl text-surface-300 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg transition-colors"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  )
}
