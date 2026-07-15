import { Building2, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using StayGrid ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. These terms constitute a legally binding agreement between you and StayGrid Technologies Pvt. Ltd.',
  },
  {
    title: '2. Eligibility',
    content: 'You must be at least 18 years of age to use StayGrid. By using the Platform, you represent that you are legally capable of entering into binding contracts. If you are accessing the Platform on behalf of a business entity, you represent that you have the authority to bind that entity.',
  },
  {
    title: '3. Account Registration',
    content: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate, current, and complete information during registration. You are solely responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.',
  },
  {
    title: '4. Booking & Payments',
    content: 'When you make a booking through StayGrid, you enter into a direct contract with the hotel. StayGrid acts as an intermediary platform. Payments are processed through our secure payment gateway. All prices are in Indian Rupees (INR) unless specified otherwise. Applicable taxes (GST) will be added at checkout.',
  },
  {
    title: '5. Cancellation & Refunds',
    content: 'Cancellation and refund policies vary by hotel and rate plan. Please review the cancellation policy displayed on the booking page before confirming your reservation. StayGrid will process refunds as per the applicable policy, typically within 5-7 business days.',
  },
  {
    title: '6. User Conduct',
    content: 'You agree not to: (a) use the Platform for any unlawful purpose; (b) interfere with the proper functioning of the Platform; (c) attempt to gain unauthorized access to any part of the Platform; (d) provide false or misleading information; (e) engage in any activity that disrupts the experience of other users.',
  },
  {
    title: '7. Intellectual Property',
    content: 'All content on StayGrid, including logos, trademarks, text, images, and software, is the property of StayGrid Technologies Pvt. Ltd. or its licensors. You may not reproduce, distribute, or create derivative works without our express written consent.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'StayGrid shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability for any claim shall not exceed the total amount paid by you for the specific booking giving rise to the claim.',
  },
  {
    title: '9. Indemnification',
    content: 'You agree to indemnify and hold StayGrid harmless from any claims, damages, losses, or expenses arising out of your use of the Platform, violation of these terms, or infringement of any third-party rights.',
  },
  {
    title: '10. Governing Law',
    content: 'These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.',
  },
  {
    title: '11. Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of StayGrid after any changes constitutes acceptance of the new terms. We will notify you of material changes via email.',
  },
  {
    title: '12. Contact Information',
    content: 'For any questions regarding these Terms of Service, please contact us at support@staygrid.com or write to us at our registered office in Kolkata, West Bengal.',
  },
]

export default function TermsOfService() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Last updated: 1 January 2026. Please read these terms carefully before using StayGrid.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface-800 rounded-xl p-8 border border-surface-700 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-bold">Introduction</h2>
          </div>
          <p className="text-surface-300 leading-relaxed">
            StayGrid Technologies Pvt. Ltd. ("StayGrid," "we," "us," or "our") provides an online platform
            that connects travellers with hotels, resorts, and other accommodation providers across India.
            These Terms of Service ("Terms") govern your access to and use of the StayGrid website and mobile application.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-surface-800 rounded-xl p-6 border border-surface-700">
              <h3 className="text-lg font-semibold mb-3 text-white">{section.title}</h3>
              <p className="text-surface-300 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-surface-800 rounded-xl p-8 border border-surface-700 text-center">
          <h3 className="text-xl font-semibold mb-3">Questions About Our Terms?</h3>
          <p className="text-surface-400 mb-4">We're here to help. Reach out to our support team.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
