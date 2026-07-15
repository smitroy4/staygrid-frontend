import { Building2, Search, BookOpen, Shield, CreditCard, RefreshCw, User, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    articles: ['How to create an account', 'How to search for hotels', 'Understanding hotel listings', 'How to make a booking'],
  },
  {
    icon: CreditCard,
    title: 'Payments & Pricing',
    articles: ['Accepted payment methods', 'Understanding pricing and taxes', 'How to apply promo codes', 'Refund processing times'],
  },
  {
    icon: RefreshCw,
    title: 'Bookings & Cancellations',
    articles: ['How to modify a booking', 'Cancellation policy explained', 'Requesting a refund', 'Booking confirmation not received'],
  },
  {
    icon: User,
    title: 'Account & Profile',
    articles: ['Updating your profile', 'Changing your password', 'How to delete your account', 'Managing your preferences'],
  },
  {
    icon: Shield,
    title: 'Safety & Trust',
    articles: ['Is my payment secure?', 'How we verify hotels', 'Reporting a issue', 'Data privacy on StayGrid'],
  },
  {
    icon: MessageCircle,
    title: 'Contact & Support',
    articles: ['How to contact support', 'Response time commitments', 'Escalating a complaint', 'Office hours and locations'],
  },
]

const popularArticles = [
  'How to cancel a booking',
  'Refund policy and timelines',
  'How to modify booking dates',
  'Accepted payment methods',
  'How to reset my password',
]

export default function HelpCenter() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input type="text" placeholder="Search for help articles..." className="w-full bg-surface-700 border border-surface-600 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-surface-400 focus:outline-none focus:border-brand-500 transition-colors" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700 hover:border-brand-500/50 transition-all">
              <cat.icon className="w-10 h-10 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.articles.map((article) => (
                  <li key={article} className="text-sm text-surface-400 hover:text-white transition-colors cursor-pointer">
                    &#8226; {article}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Articles</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {popularArticles.map((article) => (
              <div key={article} className="bg-surface-900 rounded-lg px-5 py-3.5 border border-surface-700 hover:border-brand-500/50 transition-all cursor-pointer flex items-center justify-between">
                <span className="text-surface-300 text-sm">{article}</span>
                <span className="text-brand-400 text-sm">&#8594;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <MessageCircle className="w-12 h-12 text-brand-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
        <p className="text-surface-400 mb-6 max-w-xl mx-auto">
          Our support team is available Monday to Saturday, 10 AM to 7 PM IST. We typically respond within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Support
          </Link>
          <a href="mailto:support@staygrid.com" className="bg-surface-700 hover:bg-surface-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-surface-600">
            Email Us
          </a>
        </div>
      </section>
    </div>
  )
}
