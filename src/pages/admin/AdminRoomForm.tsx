import { useState, useEffect, type FormEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import { getHotelRoom, createRoom, updateRoom } from '../../api/rooms'
import type { RoomDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

export default function AdminRoomForm() {
  const { hotelId, roomId } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(roomId)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<RoomDto>({
    id: null,
    type: '',
    basePrice: 0,
    photos: [''],
    amenities: [''],
    totalCount: 1,
    capacity: 2,
  })

  useEffect(() => {
    if (roomId && hotelId) {
      setLoading(true)
      getHotelRoom(Number(hotelId), Number(roomId))
        .then((room) => {
          setForm({
            ...room,
            photos: room.photos?.length ? room.photos : [''],
            amenities: room.amenities?.length ? room.amenities : [''],
          })
        })
        .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load room'))
        .finally(() => setLoading(false))
    }
  }, [roomId, hotelId])

  const updateArr = (field: 'photos' | 'amenities', idx: number, val: string) => {
    const arr = [...form[field]]
    arr[idx] = val
    setForm({ ...form, [field]: arr })
  }

  const addArr = (field: 'photos' | 'amenities') => {
    setForm({ ...form, [field]: [...form[field], ''] })
  }

  const removeArr = (field: 'photos' | 'amenities', idx: number) => {
    const arr = form[field].filter((_, i) => i !== idx)
    setForm({ ...form, [field]: arr.length ? arr : [''] })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        photos: form.photos.filter(Boolean),
        amenities: form.amenities.filter(Boolean),
      }
      if (isEdit) {
        await updateRoom(Number(hotelId), Number(roomId), payload)
        toast.success('Room updated')
      } else {
        await createRoom(Number(hotelId), payload)
        toast.success('Room created')
      }
      navigate(`/admin/hotels/${hotelId}/rooms`)
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading room..." />
  if (error) return <div className="max-w-3xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/admin/hotels/${hotelId}/rooms`} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Rooms
      </Link>

      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Room' : 'Add Room Type'}</h1>

      <form onSubmit={handleSubmit} className="bg-surface-800 rounded-xl p-6 border border-surface-700 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-surface-300 mb-1">Room Type *</label>
            <input
              type="text"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
              placeholder="Deluxe, Standard, Suite..."
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">Base Price ($) *</label>
            <input
              type="number"
              step="0.01"
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
              required
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-surface-300 mb-1">Total Rooms *</label>
            <input
              type="number"
              value={form.totalCount}
              onChange={(e) => setForm({ ...form, totalCount: Number(e.target.value) })}
              required
              min={1}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">Capacity (persons) *</label>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
              required
              min={1}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-surface-300 mb-1">Photo URLs</label>
          {form.photos.map((url, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateArr('photos', idx, e.target.value)}
                className="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                placeholder="https://example.com/room-photo.jpg"
              />
              <button type="button" onClick={() => removeArr('photos', idx)} className="text-surface-400 hover:text-red-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArr('photos')} className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>

        <div>
          <label className="block text-sm text-surface-300 mb-1">Amenities</label>
          {form.amenities.map((a, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={a}
                onChange={(e) => updateArr('amenities', idx, e.target.value)}
                className="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                placeholder="AC, TV, Mini-bar..."
              />
              <button type="button" onClick={() => removeArr('amenities', idx)} className="text-surface-400 hover:text-red-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArr('amenities')} className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Amenity
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : isEdit ? 'Update Room' : 'Create Room'}
        </button>
      </form>
    </div>
  )
}
