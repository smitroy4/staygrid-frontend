import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TrendingUp, Calendar, ArrowLeft, DollarSign, BarChart3 } from 'lucide-react'
import { getHotelReports } from '../../api/hotels'
import type { HotelReport } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

export default function AdminReports() {
  const { hotelId } = useParams()
  const [report, setReport] = useState<HotelReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

  const fetchReport = () => {
    if (!hotelId) return
    setLoading(true)
    getHotelReports(Number(hotelId), startDate, endDate)
      .then(setReport)
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load reports'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchReport() }, [hotelId])

  if (loading) return <LoadingSpinner fullPage text="Loading reports..." />
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/admin/hotels/${hotelId}`} className="flex items-center gap-1 text-surface-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Hotel
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-surface-400 text-sm">Revenue and booking analytics</p>
      </div>

      <div className="bg-surface-800 rounded-xl p-5 border border-surface-700 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm text-surface-300 mb-1">From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-500 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm text-surface-300 mb-1">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-500 [color-scheme:dark]"
            />
          </div>
          <button
            onClick={fetchReport}
            className="mt-6 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-surface-400 text-sm">Total Bookings</p>
            </div>
            <p className="text-3xl font-bold">{report.bookingCount}</p>
          </div>
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-surface-400 text-sm">Total Revenue</p>
            </div>
            <p className="text-3xl font-bold text-green-400">${report.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <BarChart3 className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-surface-400 text-sm">Avg Revenue / Booking</p>
            </div>
            <p className="text-3xl font-bold text-brand-400">${report.avgRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
