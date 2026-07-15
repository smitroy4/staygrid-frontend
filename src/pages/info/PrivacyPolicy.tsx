import { Building2, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly: name, email address, phone number, payment information, and any other details you choose to share. We also automatically collect certain information when you use the Platform, including IP address, browser type, device information, and usage patterns through cookies and similar technologies.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use your information to: (a) process your bookings and payments; (b) communicate with you about your reservations; (c) send you promotional offers and updates (with your consent); (d) improve our Platform and personalize your experience; (e) comply with legal obligations; and (f) prevent fraud and ensure the security of our Platform.',
  },
  {
    title: '3. Information Sharing',
    content: 'We share your information with: (a) hotels and accommodation providers to fulfill your booking; (b) payment processors for transaction processing; (c) service providers who assist us in operating the Platform; (d) law enforcement or regulatory authorities when required by law. We do not sell your personal information to third parties.',
  },
  {
    title: '4. Data Security',
    content: 'We implement industry-standard security measures to protect your information, including SSL/TLS encryption, secure data storage, and regular security audits. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.',
  },
  {
    title: '5. Cookies & Tracking',
    content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the Platform.',
  },
  {
    title: '6. Your Rights',
    content: 'Under Indian law and applicable data protection regulations, you have the right to: (a) access your personal data; (b) correct inaccurate data; (c) request deletion of your data; (d) restrict or object to processing; (e) data portability; and (f) withdraw consent at any time. To exercise these rights, please contact our Data Protection Officer.',
  },
  {
    title: '7. Data Retention',
    content: 'We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain information as required by law or for legitimate business purposes, such as fraud prevention and record-keeping.',
  },
  {
    title: '8. Third-Party Services',
    content: 'Our Platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.',
  },
  {
    title: '9. Children\'s Privacy',
    content: 'StayGrid is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.',
  },
  {
    title: '10. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on the Platform and, where appropriate, via email. Your continued use of StayGrid after changes constitutes acceptance of the updated policy.',
  },
  {
    title: '11. Grievance Officer',
    content: 'In compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, we have appointed a Grievance Officer. You may contact our Grievance Officer at: grievance@staygrid.com. Address: StayGrid Technologies Pvt. Ltd., Kolkata, West Bengal, India.',
  },
  {
    title: '12. Contact Us',
    content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us: Email: support@staygrid.com, Address: StayGrid Technologies Pvt. Ltd., Kolkata, West Bengal, India.',
  },
]

export default function PrivacyPolicy() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Last updated: 1 January 2026. Your privacy matters to us. Learn how we collect, use, and protect your data.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface-800 rounded-xl p-8 border border-surface-700 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-bold">Our Commitment</h2>
          </div>
          <p className="text-surface-300 leading-relaxed">
            At StayGrid Technologies Pvt. Ltd., we take your privacy seriously. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you use our platform.
            We comply with the Information Technology Act, 2000 and its rules, as well as applicable data
            protection laws in India.
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
          <h3 className="text-xl font-semibold mb-3">Privacy Questions?</h3>
          <p className="text-surface-400 mb-4">Contact our Data Protection Officer for any privacy-related inquiries.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
