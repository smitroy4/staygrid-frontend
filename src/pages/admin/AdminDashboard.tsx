import { Building2, BedDouble, CalendarCheck, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-surface-400 text-sm">Manage your hotels, rooms, and bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Building2, label: 'My Hotels', desc: 'Manage your properties', link: '/admin/hotels', color: 'text-blue-400' },
          { icon: BedDouble, label: 'Room Inventory', desc: 'Update pricing & availability', link: '/admin/hotels', color: 'text-green-400' },
          { icon: CalendarCheck, label: 'Bookings', desc: 'View all reservations', link: '/admin/hotels', color: 'text-purple-400' },
          { icon: TrendingUp, label: 'Reports', desc: 'Revenue & analytics', link: '/admin/hotels', color: 'text-orange-400' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="bg-surface-800 rounded-xl p-5 border border-surface-700 hover:border-brand-500/50 transition-all group"
          >
            <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
            <h3 className="font-semibold">{item.label}</h3>
            <p className="text-sm text-surface-400 mb-2">{item.desc}</p>
            <span className="text-xs text-brand-400 group-hover:text-brand-300 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="bg-surface-800 rounded-xl p-6 border border-surface-700">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/hotels/new"
            className="flex items-center gap-3 bg-surface-700 hover:bg-surface-600 rounded-lg p-4 transition-colors"
          >
            <Building2 className="w-6 h-6 text-brand-500" />
            <div>
              <p className="font-medium text-sm">Add New Hotel</p>
              <p className="text-xs text-surface-400">Create a new property listing</p>
            </div>
          </Link>
          <Link
            to="/admin/hotels"
            className="flex items-center gap-3 bg-surface-700 hover:bg-surface-600 rounded-lg p-4 transition-colors"
          >
            <BedDouble className="w-6 h-6 text-brand-500" />
            <div>
              <p className="font-medium text-sm">Manage Rooms</p>
              <p className="text-xs text-surface-400">Add or edit room types</p>
            </div>
          </Link>
          <Link
            to="/admin/hotels"
            className="flex items-center gap-3 bg-surface-700 hover:bg-surface-600 rounded-lg p-4 transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-brand-500" />
            <div>
              <p className="font-medium text-sm">View Reports</p>
              <p className="text-xs text-surface-400">Check revenue and bookings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
