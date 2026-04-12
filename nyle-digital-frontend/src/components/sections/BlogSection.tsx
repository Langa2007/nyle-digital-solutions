'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    title: 'How to Keep Frontend, Backend, and Admin Teams Shipping Together',
    excerpt:
      'A practical operating model for reducing drift across product surfaces and internal tools.',
    author: 'Nyle Delivery Team',
    date: 'Jan 15, 2026',
    category: 'Delivery',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?auto=format&fit=crop&w=800',
  },
  {
    title: 'Designing Blue-Forward Interfaces Without Losing Clarity',
    excerpt:
      'How to keep a strong color identity while improving readability, spacing, and hierarchy.',
    author: 'Nyle Design Team',
    date: 'Jan 08, 2026',
    category: 'Design',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800',
  },
  {
    title: 'Environment-Driven Deployments That Reduce Release Surprises',
    excerpt:
      'Why centralising deployment values matters once your site, admin panel, and API grow apart.',
    author: 'Nyle Platform Team',
    date: 'Dec 22, 2025',
    category: 'Platform',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Insights
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Notes from delivery, platform work, and interface refinement.
            </h2>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Talk through your roadmap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {post.readTime}
                    </span>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      Continue the conversation
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
