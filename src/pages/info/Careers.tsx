import { Building2, Briefcase, MapPin, Clock, DollarSign, Send } from 'lucide-react'

const perks = [
  'Competitive salary with performance bonuses',
  'Flexible work hours & remote-friendly',
  'Health insurance coverage',
  'Annual learning & development budget',
  'Team outings & cultural events',
  'Free StayGrid credits for hotel stays',
]

const jobs = [
  {
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    dept: 'Engineering',
    jd: [
      'Design and build RESTful APIs using Spring Boot / Java',
      'Optimize database queries and manage PostgreSQL databases',
      'Implement authentication, authorization, and security best practices',
      'Collaborate with frontend teams to integrate APIs',
      'Write unit and integration tests for all services',
    ],
    requirements: [
      '2+ years experience in Java / Spring Boot',
      'Strong understanding of REST API design',
      'Experience with PostgreSQL or MySQL',
      'Familiarity with Docker and cloud platforms (AWS/GCP)',
      'Knowledge of CI/CD pipelines is a plus',
    ],
  },
  {
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    dept: 'Engineering',
    jd: [
      'Build responsive web applications using React and TypeScript',
      'Implement pixel-perfect UIs from Figma designs',
      'Optimize application performance and SEO',
      'Integrate REST APIs and manage state effectively',
      'Write reusable component libraries',
    ],
    requirements: [
      '2+ years experience in React / TypeScript',
      'Strong knowledge of CSS, Tailwind, and responsive design',
      'Experience with state management (Context API, Zustand, etc.)',
      'Familiarity with Git and agile workflows',
      'Understanding of web performance optimization',
    ],
  },
  {
    title: 'Database Administrator',
    type: 'Full-time',
    location: 'Kolkata',
    dept: 'Engineering',
    jd: [
      'Manage and maintain PostgreSQL and Redis databases',
      'Perform backup, recovery, and disaster planning',
      'Monitor database performance and optimize queries',
      'Implement data security and access control policies',
      'Automate routine database maintenance tasks',
    ],
    requirements: [
      '3+ years experience as a DBA',
      'Expertise in PostgreSQL administration',
      'Experience with database replication and clustering',
      'Knowledge of cloud database services (RDS, Cloud SQL)',
      'Scripting skills in Python or Bash',
    ],
  },
  {
    title: 'Sales Manager',
    type: 'Full-time',
    location: 'Kolkata',
    dept: 'Sales',
    jd: [
      'Drive B2B partnerships with hotels and property owners',
      'Achieve monthly and quarterly sales targets',
      'Build and maintain a strong sales pipeline',
      'Negotiate contracts and onboard new properties',
      'Train and mentor junior sales team members',
    ],
    requirements: [
      '3+ years experience in B2B sales, preferably in hospitality',
      'Excellent communication and negotiation skills',
      'Proven track record of meeting sales targets',
      'Willingness to travel within India',
      'Proficiency in CRM tools (Salesforce, HubSpot)',
    ],
  },
  {
    title: 'Customer Relationship Manager',
    type: 'Full-time',
    location: 'Kolkata',
    dept: 'Support',
    jd: [
      'Manage customer escalations and ensure timely resolution',
      'Build and maintain strong relationships with key clients',
      'Analyze customer feedback to improve service quality',
      'Coordinate with internal teams to resolve complex issues',
      'Develop customer retention strategies',
    ],
    requirements: [
      '2+ years experience in customer success or relationship management',
      'Excellent verbal and written communication skills',
      'Empathy and a customer-first mindset',
      'Experience with CRM and ticketing tools',
      'Fluency in English, Hindi, and at least one regional language',
    ],
  },
  {
    title: 'Product Manager',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    dept: 'Product',
    jd: [
      'Define product roadmap and prioritize features',
      'Work closely with engineering, design, and business teams',
      'Conduct user research and analyze data to drive decisions',
      'Write detailed PRDs and user stories',
      'Track and measure product KPIs and iterate',
    ],
    requirements: [
      '3+ years experience in product management',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent cross-functional communication',
      'Technical background or familiarity with software development',
    ],
  },
  {
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    dept: 'Engineering',
    jd: [
      'Design and maintain CI/CD pipelines',
      'Manage cloud infrastructure on AWS/GCP',
      'Automate deployment, monitoring, and alerting',
      'Ensure system security and compliance',
      'Optimize infrastructure costs and performance',
    ],
    requirements: [
      '2+ years experience in DevOps / SRE roles',
      'Strong knowledge of Docker and Kubernetes',
      'Experience with Terraform or similar IaC tools',
      'Familiarity with monitoring tools (Prometheus, Grafana)',
      'Scripting skills in Python or Shell',
    ],
  },
]

export default function Careers() {
  return (
    <div>
      <section className="relative py-20 bg-surface-800 border-b border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Help us build the future of travel in India. We're looking for passionate people to join our journey.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Work at StayGrid?</h2>
          <p className="text-surface-400 max-w-2xl mx-auto">
            We offer a collaborative, growth-oriented environment where your ideas matter.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
          {perks.map((perk) => (
            <div key={perk} className="bg-surface-800 rounded-lg px-4 py-3 border border-surface-700 text-center text-sm text-surface-300">
              {perk}
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((job) => (
            <details key={job.title} className="bg-surface-800 rounded-xl border border-surface-700 group open:border-brand-500/50 transition-all">
              <summary className="px-6 py-5 cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-open:text-brand-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-surface-400">
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.dept}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    </div>
                  </div>
                  <span className="text-surface-500 group-open:rotate-180 transition-transform mt-1">&#9660;</span>
                </div>
              </summary>
              <div className="px-6 pb-6 space-y-4 border-t border-surface-700 pt-4">
                <div>
                  <h4 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-2">Responsibilities</h4>
                  <ul className="space-y-1.5">
                    {job.jd.map((item) => (
                      <li key={item} className="text-sm text-surface-300 flex items-start gap-2">
                        <span className="text-brand-500 mt-1">&#8226;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {job.requirements.map((item) => (
                      <li key={item} className="text-sm text-surface-300 flex items-start gap-2">
                        <span className="text-brand-500 mt-1">&#8226;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <a href="mailto:hr@staygrid.com" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    <Send className="w-4 h-4" /> Apply Now
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-surface-800 rounded-xl p-8 border border-surface-700 text-center">
          <h3 className="text-xl font-semibold mb-3">Didn't find your role?</h3>
          <p className="text-surface-400 mb-4">We're always looking for talented individuals. Send us your CV and we'll reach out.</p>
          <a href="mailto:hr@staygrid.com" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Send className="w-4 h-4" /> Send CV to hr@staygrid.com
          </a>
        </div>
      </section>
    </div>
  )
}
