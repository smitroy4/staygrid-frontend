import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { MapPin, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { searchHotels } from '../api/hotels'
import type { HotelPriceResponse, PageResponse } from '../types'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<PageResponse<HotelPriceResponse> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const city = searchParams.get('city') || ''
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const roomsCount = Number(searchParams.get('roomsCount')) || 1
  const page = Number(searchParams.get('page')) || 0

  const fetchHotels = async (p: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await searchHotels({ city, startDate, endDate, roomsCount, page: p, size: 10 })
      setData(res)
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Failed to search hotels')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotels(page)
  }, [city, startDate, endDate, roomsCount, page])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-surface-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {city ? `Hotels in ${city}` : 'All Hotels'}
          </h1>
          {data && (
            <p className="text-surface-400 text-sm">
              {data.totalElements} hotels found
              {startDate && endDate && ` \u2022 ${startDate} to ${endDate}`}
              {roomsCount > 1 && ` \u2022 ${roomsCount} rooms`}
            </p>
          )}
        </div>
      </div>

      {loading && <LoadingSpinner fullPage text="Searching hotels..." />}
      {error && <ErrorMessage message={error} onRetry={() => fetchHotels(page)} />}

      {data && (
        <>
          {data.content.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-surface-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No hotels found</h2>
              <p className="text-surface-400">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.content.map((hotel) => (
                <Link
                  key={hotel.id}
                  to={`/hotels/${hotel.id}?startDate=${startDate}&endDate=${endDate}&roomsCount=${roomsCount}`}
                  className="group bg-surface-800 rounded-xl overflow-hidden border border-surface-700 hover:border-brand-500/50 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={hotel.photos?.[0] || FALLBACK_IMG}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-brand-400 transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brand-500">${hotel.price.toFixed(2)}</p>
                        <p className="text-xs text-surface-400">per night</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-surface-400 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {hotel.city}
                    </div>
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {hotel.amenities.slice(0, 3).map((a) => (
                          <span key={a} className="text-xs bg-surface-700 text-surface-300 px-2 py-0.5 rounded-full">
                            {a}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="text-xs text-surface-500">+{hotel.amenities.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={data.first}
                className="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: data.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    i === page
                      ? 'bg-brand-600 text-white'
                      : 'bg-surface-800 border border-surface-700 text-surface-300 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={data.last}
                className="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
