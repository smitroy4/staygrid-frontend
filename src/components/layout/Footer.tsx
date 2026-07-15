import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-surface-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-brand-500 mb-4 hover:text-brand-400 transition-colors">
              <Building2 className="w-6 h-6" />
              <span className="text-lg font-bold">StayGrid</span>
            </Link>
            <p className="text-surface-400 text-sm">
              India's trusted platform for booking unique hotels and experiences. Discover the best stays from the Himalayas to the backwaters of Kerala.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/cancellation" className="hover:text-white transition-colors">Cancellation</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> support@staygrid.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +91 6289968445</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> Kolkata, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-700 mt-8 pt-8 text-center text-sm text-surface-500">
          &copy; {new Date().getFullYear()} StayGrid. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
