// src/components/sections/Stats.tsx
'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Activity, Code, Globe, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: <Globe className="h-7 w-7" />,
    value: 250,
    suffix: '+',
    label: 'Projects shipped',
    description: 'Product, web, mobile, and operations work delivered',
  },
  {
    icon: <Code className="h-7 w-7" />,
    value: 500,
    suffix: '+',
    label: 'Release cycles',
    description: 'Iterative delivery across design, API, and cloud',
  },
  {
    icon: <Activity className="h-7 w-7" />,
    value: 24,
    suffix: '/7',
    label: 'Ops visibility',
    description: 'Monitoring, support, and production feedback',
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    value: 50,
    suffix: '+',
    label: 'Specialists',
    description: 'Designers, engineers, analysts, and cloud leads',
  },
];

export default function Stats() {
  return (
    <section className="section-atmosphere py-20">
      <div className="section-shell relative z-10">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Delivery signal
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Proof points with enough context to matter.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:ml-auto">
            We pair ambitious interfaces with stable delivery rituals: scoped releases, visible metrics, resilient infrastructure, and support after launch.
          </p>
        </div>

        <div className="glass-panel overflow-hidden rounded-lg p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg border border-slate-200/70 bg-white/65 px-5 py-7 dark:border-white/10 dark:bg-white/5"
              >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  {stat.icon}
                </div>

                <div className="text-4xl font-semibold text-slate-950 dark:text-white md:text-5xl">
                  <CountUp
                    end={stat.value}
                    duration={2.2}
                    suffix={stat.suffix}
                  />
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                  {stat.label}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
