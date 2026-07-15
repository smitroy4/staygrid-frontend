import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BedDouble, Plus, Edit, Trash2, ArrowLeft, Package, DollarSign, Users } from 'lucide-react'
import { getHotelRooms, deleteRoom } from '../../api/rooms'
import type { RoomDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

export default function AdminRooms() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const [rooms, setRooms] = useState<RoomDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRooms = () => {
    if (!hotelId) return
    setLoading(true)
    getHotelRooms(Number(hotelId))
      .then(setRooms)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load rooms'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchRooms() }, [hotelId])

  const handleDelete = async (roomId: number) => {
    if (!confirm('Delete this room type?')) return
    try {
      await deleteRoom(Number(hotelId), roomId)
      toast.success('Room deleted')
      fetchRooms()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Delete failed')
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading rooms..." />
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/admin/hotels/${hotelId}`} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Hotel
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Room Types</h1>
        <Link
          to={`/admin/hotels/${hotelId}/rooms/new`}
          className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <BedDouble className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No rooms yet</h2>
          <p className="text-surface-400">Add room types to this hotel</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="bg-surface-800 rounded-xl p-5 border border-surface-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{room.type}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-surface-400">
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ${room.basePrice}/night</span>
                    <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {room.totalCount} rooms</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Up to {room.capacity} guests</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/hotels/${hotelId}/inventory/${room.id}`}
                    className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-surface-700 transition-colors"
                  >
                    Inventory
                  </Link>
                  <Link
                    to={`/admin/hotels/${hotelId}/rooms/${room.id}/edit`}
                    className="p-2 text-surface-400 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(room.id!)}
                    className="p-2 text-surface-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {room.amenities && room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.map((a) => (
                    <span key={a} className="text-xs bg-surface-700 text-surface-300 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
