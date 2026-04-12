import CTASection from '@/components/sections/CTASection';
import ServiceCard from '@/components/sections/ServiceCard';

const services = [
  {
    title: 'Custom Software Delivery',
    description:
      'Business systems designed around your workflows, reporting needs, and customer journeys.',
    icon: '</>',
    features: [
      'Discovery workshops and scope mapping',
      'Agile product delivery',
      'QA, release planning, and documentation',
      'Post-launch support',
    ],
    cta: 'Discuss your build',
    link: '/#contact',
  },
  {
    title: 'Web Platforms',
    description:
      'Conversion-ready web applications with fast interfaces, solid APIs, and maintainable architecture.',
    icon: 'WEB',
    features: [
      'Next.js and React frontend systems',
      'API and data model design',
      'Performance and SEO optimisation',
      'Analytics and conversion setup',
    ],
    cta: 'See delivery approach',
    link: '/#portfolio',
  },
  {
    title: 'Mobile Products',
    description:
      'Cross-platform mobile experiences shaped for launch speed, usability, and scale.',
    icon: 'APP',
    features: [
      'iOS and Android delivery',
      'Product prototyping and UX refinement',
      'Backend integration',
      'Release support and monitoring',
    ],
    cta: 'Plan a mobile rollout',
    link: '/#contact',
  },
  {
    title: 'Cloud and Infrastructure',
    description:
      'Deployment pipelines, hosting environments, and cloud operations that keep delivery stable.',
    icon: 'OPS',
    features: [
      'Cloud migration and hosting setup',
      'CI/CD pipeline support',
      'Monitoring and maintenance',
      'Security hardening',
    ],
    cta: 'Review cloud readiness',
    link: '/#impact',
  },
  {
    title: 'Digital Transformation',
    description:
      'Legacy modernisation and process redesign for teams that need better operational flow.',
    icon: 'FLOW',
    features: [
      'Legacy system assessment',
      'Workflow automation planning',
      'Platform integration design',
      'Change support for internal teams',
    ],
    cta: 'Start transformation',
    link: '/#contact',
  },
  {
    title: 'Product and Architecture Advisory',
    description:
      'Senior technical guidance for roadmap choices, platform structure, and delivery recovery.',
    icon: 'ADV',
    features: [
      'Architecture reviews',
      'Roadmap and scope coaching',
      'Technical due diligence',
      'Delivery rescue support',
    ],
    cta: 'Book an advisory session',
    link: '/#contact',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="pb-14 pt-8">
        <div className="section-shell">
          <div className="glass-panel rounded-[2rem] px-6 py-10 sm:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                Service focus
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
                Delivery lines built to keep product, brand, and operations aligned.
              </h1>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
                The UI refresh stays blue-forward, but the bigger change is clarity.
                Each service line now speaks more directly to outcomes, delivery rhythm,
                and the systems that support growth after launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              {
                number: '01',
                title: 'Discovery',
                desc: 'We define the problem, users, and delivery scope before code work begins.',
              },
              {
                number: '02',
                title: 'Design',
                desc: 'Flows, layouts, and service boundaries are tightened before implementation.',
              },
              {
                number: '03',
                title: 'Delivery',
                desc: 'Frontend, backend, and admin work move in sync instead of drifting apart.',
              },
              {
                number: '04',
                title: 'Support',
                desc: 'We stabilize launch, refine analytics, and support the next release cycle.',
              },
            ].map((step) => (
              <div
                key={step.number}
                className="glass-panel rounded-[1.75rem] px-6 py-7 text-left"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white">
                  {step.number}
                </div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
