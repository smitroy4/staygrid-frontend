import { Building2, Shield, Award, Users, Heart, Target, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Hotels Listed', value: '5,000+' },
  { label: 'Cities Covered', value: '200+' },
  { label: 'Happy Customers', value: '10 Lakh+' },
  { label: 'Years in Service', value: '6+' },
]

const values = [
  { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with our customers. Your trust drives us.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'We ensure verified listings, secure payments, and 24/7 support.' },
  { icon: Award, title: 'Quality Assurance', desc: 'Every property on StayGrid meets our strict quality standards.' },
  { icon: Users, title: 'Community Focus', desc: 'We empower local hosts and small businesses across India.' },
]

export default function AboutUs() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About StayGrid</h1>
          <p className="text-surface-400 text-lg max-w-3xl mx-auto">
            India's most trusted hotel booking platform, connecting travellers with extraordinary stays across the country.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-surface-300 leading-relaxed">
              <p>
                Founded in 2020 in Kolkata, StayGrid was born from a simple idea — make booking hotels in India
                seamless, trustworthy, and affordable. What started as a small team of travel enthusiasts has
                grown into one of India's fastest-growing hospitality platforms.
              </p>
              <p>
                From the snow-capped peaks of Manali to the serene backwaters of Alleppey, from the bustling
                streets of Mumbai to the spiritual ghats of Varanasi — StayGrid connects you with the perfect
                stay for every journey.
              </p>
              <p>
                We partner with thousands of hotels, resorts, homestays, and boutique properties across 200+
                Indian cities, ensuring that every traveller finds a home away from home.
              </p>
            </div>
          </div>
          <div className="bg-surface-800 rounded-xl p-8 border border-surface-700">
            <h3 className="text-xl font-semibold mb-6 text-center">StayGrid at a Glance</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-brand-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-surface-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Target className="w-10 h-10 text-brand-500 mx-auto mb-3" />
            <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
            <p className="text-surface-400 mt-2">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-900 rounded-xl p-6 border border-surface-700">
              <h3 className="text-xl font-semibold mb-3 text-brand-400">Our Mission</h3>
              <p className="text-surface-300 leading-relaxed">
                To simplify hotel booking for every Indian traveller by providing a reliable, transparent,
                and user-friendly platform that offers the best stays at the best prices.
              </p>
            </div>
            <div className="bg-surface-900 rounded-xl p-6 border border-surface-700">
              <h3 className="text-xl font-semibold mb-3 text-brand-400">Our Vision</h3>
              <p className="text-surface-300 leading-relaxed">
                To become India's most loved hospitality platform, empowering local businesses and
                transforming the way India travels — one booking at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="text-surface-400 mt-2">The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700 hover:border-brand-500/50 transition-all">
              <value.icon className="w-10 h-10 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-12 h-12 text-brand-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Made in India, for India</h2>
          <p className="text-surface-400 max-w-2xl mx-auto mb-8">
            Headquartered in Kolkata, West Bengal — we are proudly Indian. Our team understands the
            unique needs of Indian travellers and works tirelessly to deliver the best experience.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
