import { Building2, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-surface-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-brand-500 mb-4">
              <Building2 className="w-6 h-6" />
              <span className="text-lg font-bold">StayGrid</span>
            </div>
            <p className="text-surface-400 text-sm">
              Book unique hotels and experiences worldwide. Your perfect stay is just a click away.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-surface-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@staygrid.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 000-0000</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</li>
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
