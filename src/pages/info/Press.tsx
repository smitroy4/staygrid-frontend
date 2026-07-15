import { Building2, Newspaper, FileText, Download, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const pressReleases = [
  {
    date: '15 June 2026',
    title: 'StayGrid Raises $10M Series A to Expand Across Tier-2 Indian Cities',
    summary: 'The funding round was led by Sequoia Capital India, with participation from existing investors. StayGrid plans to use the funds to expand its presence in 50+ new cities.',
  },
  {
    date: '22 March 2026',
    title: 'StayGrid Launches AI-Powered Hotel Recommendation Engine',
    summary: 'New machine learning system provides personalized hotel suggestions based on user preferences, past bookings, and seasonal trends.',
  },
  {
    date: '10 January 2026',
    title: 'StayGrid Crosses 10 Lakh Bookings Milestone',
    summary: 'The platform achieved the milestone in just 4 years of operations, making it one of the fastest-growing hotel booking platforms in India.',
  },
  {
    date: '5 November 2025',
    title: 'StayGrid Partners with 5000+ Hotels Across 200 Indian Cities',
    summary: 'The company announced a major expansion of its hotel network, including partnerships with boutique hotels, homestays, and resorts.',
  },
  {
    date: '18 August 2025',
    title: 'StayGrid Introduces Zero-Cancellation Fee for Domestic Bookings',
    summary: 'In a move to boost customer confidence, StayGrid announced free cancellations on all domestic hotel bookings made through the platform.',
  },
]

const mediaKit = [
  { icon: FileText, title: 'Brand Guidelines', desc: 'Logo, color palette, typography, and brand usage guidelines.' },
  { icon: FileText, title: 'Press Kit ZIP', desc: 'High-res logos, product screenshots, and team photos.' },
  { icon: FileText, title: 'Company Fact Sheet', desc: 'Key metrics, milestones, and company information.' },
]

export default function Press() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Stay up to date with the latest news, announcements, and media resources from StayGrid.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="w-6 h-6 text-brand-500" />
              <h2 className="text-2xl font-bold">Press Releases</h2>
            </div>
            <div className="space-y-6">
              {pressReleases.map((item) => (
                <div key={item.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700 hover:border-brand-500/50 transition-all">
                  <div className="text-sm text-brand-400 mb-2">{item.date}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Download className="w-6 h-6 text-brand-500" />
              <h2 className="text-2xl font-bold">Media Kit</h2>
            </div>
            <div className="space-y-4">
              {mediaKit.map((item) => (
                <div key={item.title} className="bg-surface-800 rounded-xl p-5 border border-surface-700 hover:border-brand-500/50 transition-all cursor-pointer">
                  <item.icon className="w-8 h-8 text-brand-500 mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-surface-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-surface-800 rounded-xl p-6 border border-surface-700">
              <h3 className="font-semibold mb-3">Media Contact</h3>
              <p className="text-surface-400 text-sm mb-2">For press inquiries, please reach out to:</p>
              <a href="mailto:press@staygrid.com" className="text-brand-400 hover:text-brand-300 text-sm transition-colors">press@staygrid.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">In the News</h2>
          <p className="text-surface-400 max-w-2xl mx-auto mb-8">
            StayGrid has been featured in leading Indian publications including Economic Times, Hindu Business Line,
            YourStory, and Inc42.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <ExternalLink className="w-4 h-4" /> Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
