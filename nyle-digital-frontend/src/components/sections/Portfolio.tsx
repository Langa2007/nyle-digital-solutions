'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const projects = [
  {
    title: 'Commerce Operations Platform',
    category: 'Web Platform',
    description:
      'A multi-role commerce stack with ordering flows, service dashboards, and operational reporting.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Payments'],
  },
  {
    title: 'Health Services Admin System',
    category: 'Internal Operations',
    description:
      'A scheduling and records platform designed to reduce manual coordination across internal teams.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800',
    tags: ['React', 'API Services', 'Audit Logs', 'Cloud Hosting'],
  },
  {
    title: 'Member Experience Mobile Suite',
    category: 'Mobile Product',
    description:
      'Cross-platform product experience with onboarding, notifications, and user account workflows.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800',
    tags: ['Mobile UX', 'Notifications', 'Support Tools', 'Analytics'],
  },
  {
    title: 'Finance Insight Dashboard',
    category: 'SaaS Delivery',
    description:
      'A metrics-focused dashboard that turns fragmented reporting into a single decision layer.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
    tags: ['Data Flows', 'Role Access', 'Infrastructure', 'Visualization'],
  },
];

export default function Portfolio() {
  return (
    <section className="bg-slate-50/75 py-20 dark:bg-slate-950/40">
      <div className="section-shell">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Selected work
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Delivery examples that balance interface quality with backend discipline.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Each project card reflects the direction of the redesign: cleaner hierarchy,
            stronger blue accents, and a clearer connection between user experience and
            operational systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-white/25 bg-slate-950/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      In production thinking
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <BadgeCheck className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      Strategy, build, and launch support
                    </div>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      Request a similar build
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
