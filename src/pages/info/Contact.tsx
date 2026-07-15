import { Mail, Phone, MapPin, Clock, Building2 } from 'lucide-react'

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+91 6289968445', detail: 'Mon-Sat, 10 AM - 7 PM IST' },
  { icon: Mail, label: 'Email', value: 'support@staygrid.com', detail: 'We respond within 24 hours' },
  { icon: MapPin, label: 'Office Address', value: 'Kolkata, West Bengal, India', detail: 'Headquarters' },
  { icon: Clock, label: 'Business Hours', value: '10:00 AM - 7:00 PM IST', detail: 'Monday to Saturday' },
]

const faqs = [
  { q: 'How do I cancel a booking?', a: 'You can cancel your booking from the "My Bookings" section in your account. Refund timelines vary by cancellation policy.' },
  { q: 'How do I get a refund?', a: 'Refunds are processed within 5-7 business days after cancellation approval. The amount is credited to your original payment method.' },
  { q: 'Can I modify my booking dates?', a: 'Yes, you can modify dates subject to hotel availability. Contact our support team for assistance.' },
  { q: 'Is my payment secure?', a: 'Absolutely. We use industry-standard encryption and secure payment gateways to protect your transactions.' },
]

export default function Contact() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to our team for any queries, feedback, or assistance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-surface-400 mb-8">
              Have a question, feedback, or need help with your booking? Our team is here for you.
            </p>
            <div className="space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{item.label}</h3>
                    <p className="text-surface-300">{item.value}</p>
                    <p className="text-sm text-surface-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-800 rounded-xl p-8 border border-surface-700">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1">Full Name</label>
                  <input type="text" required className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1">Email</label>
                  <input type="email" required className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Subject</label>
                <input type="text" required className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Message</label>
                <textarea rows={5} required className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors resize-none" placeholder="Tell us more about your query..." />
              </div>
              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-lg font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-surface-900 rounded-xl border border-surface-700 group open:border-brand-500/50 transition-all">
                <summary className="px-6 py-4 cursor-pointer text-white font-medium hover:text-brand-400 transition-colors list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-surface-500 group-open:rotate-180 transition-transform text-sm">&#9660;</span>
                </summary>
                <div className="px-6 pb-4 text-surface-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
