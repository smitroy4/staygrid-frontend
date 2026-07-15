import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Wifi, Users, ChevronLeft, CheckCircle, ArrowRight, CreditCard } from 'lucide-react'
import { getHotelInfo } from '../api/hotels'
import { initBooking } from '../api/bookings'
import type { HotelInfo, RoomPriceResponse } from '../types'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'

export default function HotelDetailPage() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [hotelInfo, setHotelInfo] = useState<HotelInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<RoomPriceResponse | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [currentImgIdx, setCurrentImgIdx] = useState(0)

  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const roomsCount = Number(searchParams.get('roomsCount')) || 1

  useEffect(() => {
    if (!hotelId) return
    setLoading(true)
    getHotelInfo(Number(hotelId), {
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      roomsCount,
    })
      .then(setHotelInfo)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load hotel'))
      .finally(() => setLoading(false))
  }, [hotelId, startDate, endDate, roomsCount])

  const handleBook = async (room: RoomPriceResponse) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book')
      navigate('/login')
      return
    }
    setSelectedRoom(room)
    setBookingLoading(true)
    try {
      const booking = await initBooking({
        hotelId: Number(hotelId),
        roomId: room.id,
        checkInDate: startDate,
        checkOutDate: endDate,
        roomsCount,
      })
      toast.success('Booking initiated! Add guests and proceed to payment.')
      navigate(`/my-bookings`)
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Booking failed')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading hotel details..." />
  if (error) return <div className="max-w-7xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>
  if (!hotelInfo) return null

  const { hotelDto, rooms } = hotelInfo
  const photos = hotelDto.photos?.length ? hotelDto.photos : [FALLBACK_IMG]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl overflow-hidden h-[400px]">
          <img
            src={photos[currentImgIdx]}
            alt={hotelDto.name}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 h-[400px]">
          {photos.slice(1, 5).map((photo, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setCurrentImgIdx(idx + 1)}
            >
              <img
                src={photo}
                alt={`${hotelDto.name} ${idx + 2}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{hotelDto.name}</h1>
            <div className="flex items-center gap-2 text-surface-400">
              <MapPin className="w-4 h-4" />
              {hotelDto.contactInfo?.address || hotelDto.city}
            </div>
          </div>

          {hotelDto.amenities && hotelDto.amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {hotelDto.amenities.map((a) => (
                  <span key={a} className="flex items-center gap-1 bg-surface-800 text-surface-200 px-3 py-1.5 rounded-lg text-sm border border-surface-700">
                    <CheckCircle className="w-4 h-4 text-brand-500" />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-4">Available Rooms</h2>
            <div className="space-y-4">
              {rooms.length === 0 ? (
                <p className="text-surface-400">No rooms available for selected dates</p>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-surface-800 rounded-xl p-4 border border-surface-700 hover:border-brand-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{room.type}</h3>
                        {room.amenities && room.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {room.amenities.map((a) => (
                              <span key={a} className="text-xs bg-surface-700 text-surface-300 px-2 py-0.5 rounded-full">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-brand-500">${room.price.toFixed(2)}</p>
                        <p className="text-xs text-surface-400">per night</p>
                        <button
                          onClick={() => handleBook(room)}
                          disabled={bookingLoading}
                          className="mt-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {bookingLoading && selectedRoom?.id === room.id ? 'Booking...' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-700 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-400">Check-in</span>
                <span>{startDate || 'Select date'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-400">Check-out</span>
                <span>{endDate || 'Select date'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-400">Rooms</span>
                <span>{roomsCount}</span>
              </div>
              <hr className="border-surface-700" />
              {rooms.length > 0 && (
                <div className="flex justify-between text-lg font-bold">
                  <span>From</span>
                  <span className="text-brand-500">${Math.min(...rooms.map((r) => r.price)).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-surface-400">
                <CreditCard className="w-4 h-4" />
                Secure payment
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-400">
                <Users className="w-4 h-4" />
                {roomsCount > 0 ? `${roomsCount} room${roomsCount > 1 ? 's' : ''}` : 'Select rooms'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
