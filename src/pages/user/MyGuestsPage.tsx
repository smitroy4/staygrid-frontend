import { useState, useEffect, type FormEvent } from 'react'
import { Users, User, Plus, Pencil, Trash2, X } from 'lucide-react'
import { getMyGuests, createGuest, updateGuest, deleteGuest } from '../../api/users'
import type { GuestDto, Gender } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

const emptyGuest: GuestDto = { id: null, name: '', gender: 'MALE' as Gender, age: null, dateOfBirth: null }

export default function MyGuestsPage() {
  const [guests, setGuests] = useState<GuestDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GuestDto | null>(null)
  const [form, setForm] = useState<GuestDto>(emptyGuest)

  const fetchGuests = () => {
    setLoading(true)
    getMyGuests()
      .then(setGuests)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load guests'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchGuests() }, [])

  const openCreate = () => {
    setForm(emptyGuest)
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (guest: GuestDto) => {
    setForm({ ...guest })
    setEditing(guest)
    setShowForm(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await updateGuest(editing.id!, form)
        toast.success('Guest updated')
      } else {
        await createGuest(form)
        toast.success('Guest added')
      }
      setShowForm(false)
      fetchGuests()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this guest?')) return
    try {
      await deleteGuest(id)
      toast.success('Guest deleted')
      fetchGuests()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Delete failed')
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading guests..." />
  if (error) return <div className="max-w-2xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Guests</h1>
          <p className="text-surface-400 text-sm">{guests.length} saved guest{guests.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white px-3 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Guest
        </button>
      </div>

      {guests.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No guests saved</h2>
          <p className="text-surface-400">Save guest details for faster bookings</p>
        </div>
      ) : (
        <div className="space-y-3">
          {guests.map((guest) => (
            <div key={guest.id} className="bg-surface-800 rounded-xl p-4 border border-surface-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-surface-400" />
                </div>
                <div>
                  <p className="font-medium">{guest.name}</p>
                  <p className="text-sm text-surface-400">
                    {guest.gender}{guest.age ? `, ${guest.age} yrs` : ''}
                    {guest.dateOfBirth ? ` \u2022 ${guest.dateOfBirth}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(guest)} className="p-2 text-surface-400 hover:text-white transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(guest.id!)} className="p-2 text-surface-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-700 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Guest' : 'Add Guest'}</h3>
              <button onClick={() => setShowForm(false)} className="text-surface-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-surface-300 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm text-surface-300 mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-surface-300 mb-1">Age</label>
                <input
                  type="number"
                  value={form.age || ''}
                  onChange={(e) => setForm({ ...form, age: e.target.value ? Number(e.target.value) : null })}
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm text-surface-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={form.dateOfBirth || ''}
                  onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value || null })}
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 [color-scheme:dark]"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-lg font-medium transition-colors">
                  {editing ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-surface-700 hover:bg-surface-600 text-white py-2.5 rounded-lg font-medium transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
