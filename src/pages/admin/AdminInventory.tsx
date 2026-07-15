import { useState, useEffect, type FormEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, DollarSign, ToggleLeft, ToggleRight, Save, ArrowLeft } from 'lucide-react'
import { getRoomInventory, updateRoomInventory } from '../../api/inventory'
import type { InventoryDto } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

export default function AdminInventory() {
  const { hotelId, roomId } = useParams()
  const [inventory, setInventory] = useState<InventoryDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ startDate: '', endDate: '', surgeFactor: '', closed: '' })

  const fetchInventory = () => {
    if (!roomId) return
    setLoading(true)
    getRoomInventory(Number(roomId))
      .then(setInventory)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load inventory'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchInventory() }, [roomId])

  const handleBulkUpdate = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await updateRoomInventory(Number(roomId), {
        startDate: form.startDate,
        endDate: form.endDate,
        surgeFactor: form.surgeFactor ? Number(form.surgeFactor) : null,
        closed: form.closed === 'true' ? true : form.closed === 'false' ? false : null,
      })
      toast.success('Inventory updated')
      setShowForm(false)
      fetchInventory()
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Update failed')
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading inventory..." />
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  const today = new Date().toISOString().split('T')[0]
  const futureInventory = inventory.filter((i) => i.date >= today).slice(0, 90)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/admin/hotels/${hotelId}/rooms`} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Rooms
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Room Inventory</h1>
          <p className="text-surface-400 text-sm">Room ID: {roomId} - Manage pricing and availability</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Bulk Update
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleBulkUpdate} className="bg-surface-800 rounded-xl p-5 border border-surface-700 mb-6 space-y-4">
          <h3 className="font-semibold">Bulk Update Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-surface-300 mb-1">Start Date *</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm text-surface-300 mb-1">End Date *</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-surface-300 mb-1">Surge Factor (leave empty to keep current)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                value={form.surgeFactor}
                onChange={(e) => setForm({ ...form, surgeFactor: e.target.value })}
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
                placeholder="1.5"
              />
            </div>
            <div>
              <label className="block text-sm text-surface-300 mb-1">Closed</label>
              <select
                value={form.closed}
                onChange={(e) => setForm({ ...form, closed: e.target.value })}
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
              >
                <option value="">Keep current</option>
                <option value="true">Close dates</option>
                <option value="false">Open dates</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Save className="w-4 h-4" /> Apply Updates
          </button>
        </form>
      )}

      {futureInventory.length === 0 ? (
        <div className="text-center py-12">
          <CalendarDays className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <p className="text-surface-400">No inventory data available</p>
        </div>
      ) : (
        <div className="bg-surface-800 rounded-xl border border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-700">
                  <th className="text-left p-3 font-medium text-surface-300">Date</th>
                  <th className="text-left p-3 font-medium text-surface-300">Price</th>
                  <th className="text-left p-3 font-medium text-surface-300">Surge</th>
                  <th className="text-left p-3 font-medium text-surface-300">Booked</th>
                  <th className="text-left p-3 font-medium text-surface-300">Reserved</th>
                  <th className="text-left p-3 font-medium text-surface-300">Total</th>
                  <th className="text-left p-3 font-medium text-surface-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {futureInventory.map((item) => (
                  <tr key={item.id} className="border-t border-surface-700 hover:bg-surface-750">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3 font-medium">${item.price.toFixed(2)}</td>
                    <td className="p-3">{item.surgeFactor.toFixed(2)}x</td>
                    <td className="p-3">{item.bookedCount}</td>
                    <td className="p-3">{item.reservedCount}</td>
                    <td className="p-3">{item.totalCount}</td>
                    <td className="p-3">
                      {item.closed ? (
                        <span className="text-red-400 text-xs flex items-center gap-1">
                          <ToggleLeft className="w-3 h-3" /> Closed
                        </span>
                      ) : (
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          <ToggleRight className="w-3 h-3" /> Open
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
