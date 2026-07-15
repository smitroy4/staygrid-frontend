import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, Building2, Sparkles, Shield, HeadphonesIcon } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80'

const destinations = [
  { city: 'Manali', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80' },
  { city: 'Goa', state: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80' },
  { city: 'Jaipur', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80' },
  { city: 'Varanasi', state: 'Uttar Pradesh', img: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80' },
  { city: 'Kerala', state: 'Kerala', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80' },
  { city: 'Udaipur', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1590071078367-c3f11e78c5b7?w=800&q=80' },
]

function getDefaultDates() {
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return { start: fmt(today), end: fmt(nextWeek) }
}

export default function HomePage() {
  const navigate = useNavigate()
  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [roomsCount, setRoomsCount] = useState(1)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    params.set('roomsCount', String(roomsCount))
    navigate(`/search?${params.toString()}`)
  }

  const handleDestinationClick = (destCity: string) => {
    const { start, end } = getDefaultDates()
    const params = new URLSearchParams()
    params.set('city', destCity)
    params.set('startDate', start)
    params.set('endDate', end)
    params.set('roomsCount', '1')
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div>
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-surface-900/80 via-surface-900/60 to-surface-900" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Perfect
            <span className="text-brand-500"> Stay</span>
          </h1>
          <p className="text-surface-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover extraordinary hotels and experiences across India
          </p>

          <form onSubmit={handleSearch} className="bg-surface-800/90 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-surface-700 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City or destination"
                  className="w-full bg-surface-700 border border-surface-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-surface-400 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-surface-700 border border-surface-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-surface-700 border border-surface-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <select
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full bg-surface-700 border border-surface-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Search className="w-5 h-5" />
              Search Hotels
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: 'Premium Hotels', desc: 'Handpicked accommodations for every budget' },
            { icon: Sparkles, title: 'Best Prices', desc: 'Competitive rates with price matching guarantee' },
            { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Round-the-clock customer assistance' },
          ].map((item) => (
            <div key={item.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700 hover:border-brand-500/50 transition-all">
              <item.icon className="w-10 h-10 text-brand-500 mb-3" />
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-surface-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Popular Destinations in India</h2>
          <p className="text-surface-400 mt-1">Explore top tourist spots across the country</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.city}
              className="group relative rounded-xl overflow-hidden cursor-pointer h-64"
              onClick={() => handleDestinationClick(dest.city)}
            >
              <img
                src={dest.img}
                alt={dest.city}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold">{dest.city}</h3>
                <p className="text-sm text-surface-300">{dest.state}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Safe & Secure Booking</h2>
          <p className="text-surface-400 max-w-2xl mx-auto mb-8">
            Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {['Secure Payments', 'Free Cancellation', 'Best Price Guarantee', 'Verified Reviews'].map((item) => (
              <div key={item} className="text-surface-300 text-sm font-medium">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
