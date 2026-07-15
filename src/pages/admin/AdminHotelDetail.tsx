import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Edit, BedDouble, CalendarCheck, TrendingUp, ArrowLeft, CheckCircle } from 'lucide-react'
import { getAdminHotel, getHotelReports } from '../../api/hotels'
import type { HotelDto, HotelReport } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'

export default function AdminHotelDetail() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const navigate = useNavigate()

  const [hotel, setHotel] = useState<HotelDto | null>(null)
  const [report, setReport] = useState<HotelReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hotelId) return
    setLoading(true)
    Promise.all([
      getAdminHotel(Number(hotelId)),
      getHotelReports(Number(hotelId)).catch(() => null),
    ])
      .then(([h, r]) => {
        setHotel(h)
        setReport(r)
      })
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load hotel'))
      .finally(() => setLoading(false))
  }, [hotelId])

  if (loading) return <LoadingSpinner fullPage text="Loading hotel..." />
  if (error) return <div className="max-w-6xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>
  if (!hotel) return null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate('/admin/hotels')} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Hotels
      </button>

      <div className="bg-surface-800 rounded-xl overflow-hidden border border-surface-700 mb-8">
        <div className="h-64 overflow-hidden">
          <img
            src={hotel.photos?.[0] || FALLBACK_IMG}
            alt={hotel.name}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{hotel.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  hotel.active ? 'bg-green-500/20 text-green-400' : 'bg-surface-600/20 text-surface-400'
                }`}>
                  {hotel.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-surface-400">
                <MapPin className="w-4 h-4" /> {hotel.contactInfo?.address || hotel.city}
              </div>
            </div>
            <Link
              to={`/admin/hotels/${hotel.id}/edit`}
              className="flex items-center gap-1 bg-surface-700 hover:bg-surface-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </div>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {hotel.amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 text-xs bg-surface-700 text-surface-300 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-brand-500" />{a}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to={`/admin/hotels/${hotel.id}/rooms`} className="bg-surface-800 rounded-xl p-5 border border-surface-700 hover:border-brand-500/50 transition-all">
          <BedDouble className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="font-semibold">Rooms</h3>
          <p className="text-sm text-surface-400">Manage room types, prices, and inventory</p>
        </Link>
        <Link to={`/admin/hotels/${hotel.id}/bookings`} className="bg-surface-800 rounded-xl p-5 border border-surface-700 hover:border-brand-500/50 transition-all">
          <CalendarCheck className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-semibold">Bookings</h3>
          <p className="text-sm text-surface-400">View all reservations for this hotel</p>
        </Link>
        <Link to={`/admin/hotels/${hotel.id}/reports`} className="bg-surface-800 rounded-xl p-5 border border-surface-700 hover:border-brand-500/50 transition-all">
          <TrendingUp className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-surface-400">Revenue, booking count and analytics</p>
        </Link>
      </div>

      {report && (
        <div className="bg-surface-800 rounded-xl p-6 border border-surface-700">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-surface-400 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold">{report.bookingCount}</p>
            </div>
            <div>
              <p className="text-surface-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">${report.totalRevenue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-surface-400 text-sm">Avg Revenue</p>
              <p className="text-2xl font-bold text-brand-400">${report.avgRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
