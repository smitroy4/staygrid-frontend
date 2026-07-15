import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, ArrowRight } from 'lucide-react'
import { getAdminHotels, deleteHotel, activateHotel } from '../../api/hotels'
import type { HotelDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'

export default function AdminHotels() {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState<HotelDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchHotels = () => {
    setLoading(true)
    getAdminHotels()
      .then(setHotels)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load hotels'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchHotels() }, [])

  const handleActivate = async (hotelId: number) => {
    try {
      await activateHotel(hotelId)
      toast.success('Hotel activated! Inventory created for 1 year.')
      fetchHotels()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Activation failed')
    }
  }

  const handleDelete = async (hotelId: number, name: string) => {
    if (!confirm(`Delete "${name}"? This will also remove all rooms and inventory.`)) return
    try {
      await deleteHotel(hotelId)
      toast.success('Hotel deleted')
      fetchHotels()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Delete failed')
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading hotels..." />
  if (error) return <div className="max-w-6xl mx-auto px-4 py-8"><ErrorMessage message={error} onRetry={fetchHotels} /></div>

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Hotels</h1>
          <p className="text-surface-400 text-sm">{hotels.length} hotel{hotels.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          to="/admin/hotels/new"
          className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Hotel
        </Link>
      </div>

      {hotels.length === 0 ? (
        <div className="text-center py-20">
          <Building2 className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No hotels yet</h2>
          <p className="text-surface-400 mb-4">Create your first hotel listing</p>
          <Link
            to="/admin/hotels/new"
            className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Hotel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-surface-800 rounded-xl overflow-hidden border border-surface-700">
              <div className="h-40 overflow-hidden">
                <img
                  src={hotel.photos?.[0] || FALLBACK_IMG}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    hotel.active ? 'bg-green-500/20 text-green-400' : 'bg-surface-600/20 text-surface-400'
                  }`}>
                    {hotel.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-surface-400 mb-1">{hotel.city}</p>
                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-surface-700">
                  <Link
                    to={`/admin/hotels/${hotel.id}`}
                    className="flex items-center gap-1 text-sm text-surface-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View
                  </Link>
                  <Link
                    to={`/admin/hotels/${hotel.id}/edit`}
                    className="flex items-center gap-1 text-sm text-surface-300 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                  <Link
                    to={`/admin/hotels/${hotel.id}/rooms`}
                    className="flex items-center gap-1 text-sm text-surface-300 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" /> Rooms
                  </Link>
                  {!hotel.active && (
                    <button
                      onClick={() => handleActivate(hotel.id!)}
                      className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      <ToggleRight className="w-4 h-4" /> Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(hotel.id!, hotel.name)}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
