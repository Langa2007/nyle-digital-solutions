// src/components/sections/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  link: string;
}

export default function ServiceCard({ title, description, icon: Icon, features, cta, link }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
      transition={{ duration: 0.3 }}
      className="group h-full [perspective:900px]"
    >
      <div className="glass-panel relative flex h-full min-h-[420px] overflow-hidden rounded-lg p-7 transition-all duration-300 [transform-style:preserve-3d] group-hover:border-cyan-300/70 dark:group-hover:border-cyan-300/30">
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rotate-12 rounded-lg border border-cyan-200/50 bg-cyan-100/30 [transform:translateZ(-22px)_rotate(16deg)] dark:border-cyan-300/10 dark:bg-cyan-400/10" />
        <div className="pointer-events-none absolute bottom-7 right-7 grid h-24 w-24 grid-cols-3 gap-1 opacity-40 [transform:translateZ(-18px)_rotate(12deg)]">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="rounded-sm border border-blue-300/40 bg-white/20 dark:border-blue-200/15" />
          ))}
        </div>

        <div className="relative z-10 flex flex-col [transform:translateZ(24px)]">
          <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-blue-200/70 bg-white/70 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_-26px_rgba(37,99,235,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          <h3 className="mb-4 text-2xl font-semibold text-slate-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-200">
            {title}
          </h3>

          <p className="mb-6 text-base leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>

          <div className="mb-8 space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-300" aria-hidden="true" />
                <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            href={link}
            className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-cyan-300 dark:hover:text-cyan-200 dark:focus:ring-offset-slate-950"
          >
            {cta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
