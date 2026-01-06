// src/app/services/page.tsx
import ServiceCard from '@/components/sections/ServiceCard';
import CTASection from '@/components/sections/CTASection';

const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed specifically for your business needs and workflows.',
    icon: '💻',
    features: [
      'Requirement Analysis & Planning',
      'Agile Development Methodology',
      'Quality Assurance & Testing',
      'Deployment & Maintenance',
      'Technical Documentation',
    ],
    cta: 'Get a Quote',
    link: '/contact?service=custom_software',
  },
  {
    title: 'Web Applications',
    description: 'Modern, responsive web applications built with React, Next.js, and Node.js.',
    icon: '🌐',
    features: [
      'Frontend Development (React/Next.js)',
      'Backend API Development',
      'Database Design & Optimization',
      'Performance & SEO Optimization',
      'Progressive Web Apps',
    ],
    cta: 'View Portfolio',
    link: '/portfolio?type=web',
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications using React Native and Flutter.',
    icon: '📱',
    features: [
      'iOS & Android Development',
      'UI/UX Design & Prototyping',
      'API Integration',
      'App Store Deployment',
      'Push Notifications',
    ],
    cta: 'Learn More',
    link: '/services/mobile-apps',
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'Scalable cloud solutions with AWS, Azure, GCP, and Docker/Kubernetes.',
    icon: '☁️',
    features: [
      'Cloud Migration Strategy',
      'VPS Hosting & Management',
      'Docker & Kubernetes Setup',
      'CI/CD Pipeline Implementation',
      '24/7 Server Monitoring',
    ],
    cta: 'View Plans',
    link: '/hosting',
  },
  {
    title: 'Digital Transformation',
    description: 'Modernize legacy systems and transform your business with cutting-edge technology.',
    icon: '🔄',
    features: [
      'Legacy System Modernization',
      'API Development & Integration',
      'Microservices Architecture',
      'Digital Strategy Consulting',
      'Process Automation',
    ],
    cta: 'Start Transformation',
    link: '/contact?service=digital_transformation',
  },
  {
    title: 'Consulting Services',
    description: 'Expert tech stack advisory, architecture design, and team augmentation.',
    icon: '🎯',
    features: [
      'Tech Stack Advisory',
      'System Architecture Design',
      'Team Augmentation',
      'Project Rescue & Auditing',
      'Code Review & Optimization',
    ],
    cta: 'Book Consultation',
    link: '/contact?service=consulting',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive technology solutions to transform your business and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              A systematic approach to ensure successful project delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'Understand your requirements and goals' },
              { number: '02', title: 'Planning', desc: 'Create detailed roadmap and architecture' },
              { number: '03', title: 'Development', desc: 'Agile development with regular updates' },
              { number: '04', title: 'Delivery', desc: 'Deployment, training, and support' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Flexible Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$2,999',
                period: 'per project',
                features: ['Up to 5 pages', 'Responsive Design', 'Basic SEO', 'Contact Form', '6 months support'],
                cta: 'Get Started',
                popular: false,
              },
              {
                name: 'Professional',
                price: '$7,999',
                period: 'per project',
                features: ['Up to 15 pages', 'Custom Design', 'Advanced SEO', 'CMS Integration', '1 year support', 'API Integration'],
                cta: 'Get Started',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'tailored pricing',
                features: ['Unlimited pages', 'Full Customization', 'Enterprise SEO', 'Custom CMS', 'Priority Support', 'Dedicated Team'],
                cta: 'Contact Sales',
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl border ${plan.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200 dark:border-gray-700'} p-8`}
              >
                {plan.popular && (
                  <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}