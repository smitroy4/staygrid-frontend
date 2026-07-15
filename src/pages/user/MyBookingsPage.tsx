import { useState, useEffect } from 'react'
import { CalendarDays, MapPin, CreditCard, XCircle, ExternalLink, Plus } from 'lucide-react'
import { getMyBookings } from '../../api/users'
import { initiatePayment, cancelBooking, addGuestsToBooking } from '../../api/bookings'
import { getMyGuests } from '../../api/users'
import type { BookingDto, BookingStatus, GuestDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

const statusColors: Record<string, string> = {
  RESERVED: 'bg-yellow-500/20 text-yellow-400',
  GUESTS_ADDED: 'bg-blue-500/20 text-blue-400',
  PAYMENT_PENDING: 'bg-orange-500/20 text-orange-400',
  CONFIRMED: 'bg-green-500/20 text-green-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
  EXPIRED: 'bg-surface-600/20 text-surface-400',
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [guests, setGuests] = useState<GuestDto[]>([])
  const [showGuestPicker, setShowGuestPicker] = useState<number | null>(null)
  const [selectedGuestIds, setSelectedGuestIds] = useState<number[]>([])

  const fetchBookings = () => {
    setLoading(true)
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchBookings() }, [])

  const handlePay = async (bookingId: number) => {
    try {
      const res = await initiatePayment(bookingId)
      window.location.href = res.sessionUrl
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Payment initiation failed')
    }
  }

  const handleCancel = async (bookingId: number) => {
    if (!confirm('Cancel this booking?')) return
    try {
      await cancelBooking(bookingId)
      toast.success('Booking cancelled')
      fetchBookings()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Cancellation failed')
    }
  }

  const openGuestPicker = async (bookingId: number) => {
    try {
      const g = await getMyGuests()
      setGuests(g)
      setShowGuestPicker(bookingId)
      setSelectedGuestIds([])
    } catch {
      toast.error('Failed to load guests')
    }
  }

  const handleAddGuests = async () => {
    if (!showGuestPicker || selectedGuestIds.length === 0) return
    try {
      await addGuestsToBooking(showGuestPicker, selectedGuestIds)
      toast.success('Guests added')
      setShowGuestPicker(null)
      fetchBookings()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Failed to add guests')
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading bookings..." />
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-surface-400 text-sm">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <CalendarDays className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-surface-400">Start by searching for hotels</p>
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
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

              <div className="flex flex-wrap gap-2">
                {booking.bookingStatus === 'RESERVED' && (
                  <button
                    onClick={() => openGuestPicker(booking.id)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Guests
                  </button>
                )}
                {['RESERVED', 'GUESTS_ADDED'].includes(booking.bookingStatus) && (
                  <button
                    onClick={() => handlePay(booking.id)}
                    className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <CreditCard className="w-4 h-4" /> Pay Now
                  </button>
                )}
                {booking.bookingStatus === 'CONFIRMED' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                )}
              </div>

              {showGuestPicker === booking.id && (
                <div className="mt-4 p-4 bg-surface-700 rounded-lg">
                  <h4 className="text-sm font-semibold mb-3">Select Guests</h4>
                  {guests.length === 0 ? (
                    <p className="text-sm text-surface-400">
                      No saved guests.{' '}
                      <a href="/my-guests" className="text-brand-400 hover:text-brand-300">Add guests first</a>
                    </p>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                        {guests.map((g) => (
                          <label key={g.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedGuestIds.includes(g.id!)}
                              onChange={() => {
                                setSelectedGuestIds((prev) =>
                                  prev.includes(g.id!) ? prev.filter((id) => id !== g.id!) : [...prev, g.id!]
                                )
                              }}
                              className="accent-brand-500"
                            />
                            {g.name} ({g.gender})
                          </label>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddGuests}
                          className="bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setShowGuestPicker(null)}
                          className="bg-surface-600 hover:bg-surface-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
