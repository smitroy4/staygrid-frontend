import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, ArrowLeft } from 'lucide-react'
import { getHotelBookings } from '../../api/hotels'
import type { BookingDto, BookingStatus } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

const statusColors: Record<string, string> = {
  RESERVED: 'bg-yellow-500/20 text-yellow-400',
  GUESTS_ADDED: 'bg-blue-500/20 text-blue-400',
  PAYMENT_PENDING: 'bg-orange-500/20 text-orange-400',
  CONFIRMED: 'bg-green-500/20 text-green-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
  EXPIRED: 'bg-surface-600/20 text-surface-400',
}

export default function AdminBookings() {
  const { hotelId } = useParams()
  const [bookings, setBookings] = useState<BookingDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hotelId) return
    setLoading(true)
    getHotelBookings(Number(hotelId))
      .then(setBookings)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [hotelId])

  if (loading) return <LoadingSpinner fullPage text="Loading bookings..." />
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/admin/hotels/${hotelId}`} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Hotel
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hotel Bookings</h1>
        <p className="text-surface-400 text-sm">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <CalendarDays className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-surface-400">Bookings will appear here once guests make reservations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-surface-800 rounded-xl p-5 border border-surface-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[booking.bookingStatus]}`}>
                      {booking.bookingStatus}
                    </span>
                    <span className="text-surface-400 text-sm">Booking #{booking.id}</span>
                  </div>
                  <p className="text-lg font-bold text-brand-500">${booking.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-surface-400">Check-in</p>
                  <p className="font-medium">{booking.checkInDate}</p>
                </div>
                <div>
                  <p className="text-surface-400">Check-out</p>
                  <p className="font-medium">{booking.checkOutDate}</p>
                </div>
                <div>
                  <p className="text-surface-400">Rooms</p>
                  <p className="font-medium">{booking.roomsCount}</p>
                </div>
                <div>
                  <p className="text-surface-400">Guests</p>
                  <p className="font-medium">{booking.guests?.length || 0}</p>
                </div>
              </div>
              {booking.guests && booking.guests.length > 0 && (
                <div className="mt-3 pt-3 border-t border-surface-700">
                  <p className="text-sm text-surface-400 mb-1">Guest Details:</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.guests.map((guest) => (
                      <span key={guest.id} className="text-xs bg-surface-700 text-surface-300 px-2 py-1 rounded-full">
                        {guest.name} ({guest.gender})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
