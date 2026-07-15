import { Building2, Shield, Clock, RotateCcw, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const policies = [
  {
    title: 'Free Cancellation',
    timeframe: 'Up to 48 hours before check-in',
    refund: '100% refund',
    desc: 'Cancel your booking at least 48 hours before the scheduled check-in time and receive a full refund with no cancellation fees.',
  },
  {
    title: 'Partial Cancellation',
    timeframe: '24-48 hours before check-in',
    refund: '50% refund',
    desc: 'If you cancel between 24 and 48 hours before check-in, you will receive a 50% refund of the total booking amount.',
  },
  {
    title: 'Late Cancellation',
    timeframe: 'Less than 24 hours before check-in',
    refund: 'No refund',
    desc: 'Cancellations made within 24 hours of check-in are non-refundable. However, you may contact the hotel directly for any exceptions.',
  },
  {
    title: 'No-Show',
    timeframe: 'After check-in time',
    refund: 'No refund',
    desc: 'If you do not check in on the scheduled date without prior cancellation, the booking is marked as a no-show and is non-refundable.',
  },
]

const steps = [
  { step: '1', title: 'Log in to your account', desc: 'Go to the "My Bookings" section from your account dashboard.' },
  { step: '2', title: 'Select the booking', desc: 'Find the booking you wish to cancel and click on it to view details.' },
  { step: '3', title: 'Click Cancel Booking', desc: 'Scroll down and click the "Cancel Booking" button.' },
  { step: '4', title: 'Confirm cancellation', desc: 'Review the cancellation policy and confirm. You will receive a confirmation email.' },
]

export default function Cancellation() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cancellation Policy</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Understand our cancellation and refund policies before making a booking.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <RotateCcw className="w-10 h-10 text-brand-500 mx-auto mb-3" />
          <h2 className="text-3xl font-bold mb-3">Cancellation Timelines & Refunds</h2>
          <p className="text-surface-400 max-w-2xl mx-auto">
            Refund amounts depend on how far in advance you cancel. All times are in IST (Indian Standard Time).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {policies.map((policy) => (
            <div key={policy.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700">
              <h3 className="text-lg font-semibold mb-1">{policy.title}</h3>
              <div className="flex items-center gap-2 text-sm text-surface-400 mb-2">
                <Clock className="w-4 h-4" /> {policy.timeframe}
              </div>
              <div className="inline-block bg-brand-600/20 text-brand-400 text-sm font-medium px-3 py-1 rounded-full mb-3">
                {policy.refund}
              </div>
              <p className="text-surface-300 text-sm leading-relaxed">{policy.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-800 border-y border-surface-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">How to Cancel a Booking</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-600/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-brand-500 font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-surface-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface-800 rounded-xl p-8 border border-surface-700">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-brand-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Important Notes</h3>
              <ul className="space-y-2 text-sm text-surface-300">
                <li>&#8226; Refunds are processed within 5-7 business days after cancellation is confirmed.</li>
                <li>&#8226; The refund amount is credited to the original payment method used at the time of booking.</li>
                <li>&#8226; Some hotels may have their own cancellation policies that override the standard policy. Please check the hotel listing for details.</li>
                <li>&#8226; StayGrid does not charge any additional platform fees for cancellations.</li>
                <li>&#8226; For bookings made through third-party platforms, please refer to their respective cancellation policies.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-surface-400 mb-4">Need help with a cancellation?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}
