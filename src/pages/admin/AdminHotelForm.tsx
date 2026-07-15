import { useState, useEffect, type FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Building2, Save, ArrowLeft, Plus, X } from 'lucide-react'
import { getAdminHotel, createHotel, updateHotel } from '../../api/hotels'
import type { HotelDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

export default function AdminHotelForm() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(hotelId)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<HotelDto>({
    id: null,
    name: '',
    city: '',
    photos: [''],
    amenities: [''],
    contactInfo: { address: '', phoneNumber: '', email: '', location: '' },
    active: null,
  })

  useEffect(() => {
    if (hotelId) {
      setLoading(true)
      getAdminHotel(Number(hotelId))
        .then((hotel) => {
          setForm({
            ...hotel,
            photos: hotel.photos?.length ? hotel.photos : [''],
            amenities: hotel.amenities?.length ? hotel.amenities : [''],
          })
        })
        .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load hotel'))
        .finally(() => setLoading(false))
    }
  }, [hotelId])

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
        await updateHotel(Number(hotelId), payload)
        toast.success('Hotel updated')
      } else {
        await createHotel(payload)
        toast.success('Hotel created')
      }
      navigate('/admin/hotels')
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading hotel..." />
  if (error) return <div className="max-w-3xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate('/admin/hotels')} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Hotels
      </button>

      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Hotel' : 'Add New Hotel'}</h1>

      <form onSubmit={handleSubmit} className="bg-surface-800 rounded-xl p-6 border border-surface-700 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-surface-300 mb-1">Hotel Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">City *</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-surface-300 mb-1">Address</label>
          <input
            type="text"
            value={form.contactInfo.address}
            onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, address: e.target.value } })}
            className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-surface-300 mb-1">Phone</label>
            <input
              type="text"
              value={form.contactInfo.phoneNumber}
              onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, phoneNumber: e.target.value } })}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">Email</label>
            <input
              type="email"
              value={form.contactInfo.email}
              onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, email: e.target.value } })}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">Location URL</label>
            <input
              type="text"
              value={form.contactInfo.location}
              onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, location: e.target.value } })}
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
                placeholder="https://example.com/photo.jpg"
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
                placeholder="WiFi, Pool, Gym..."
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
          {saving ? 'Saving...' : isEdit ? 'Update Hotel' : 'Create Hotel'}
        </button>
      </form>
    </div>
  )
}
