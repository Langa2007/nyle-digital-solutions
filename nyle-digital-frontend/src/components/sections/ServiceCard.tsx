// src/components/sections/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  link: string;
}

export default function ServiceCard({ title, description, icon, features, cta, link }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      transition={{ duration: 0.3 }}
      className="group [perspective:900px]"
    >
      <div className="glass-panel relative h-full overflow-hidden rounded-[2rem] p-8 transition-all duration-300 [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:border-blue-300 dark:group-hover:border-blue-400/30">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-300/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-300/10" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-20 w-20 rounded-[1.5rem] border border-blue-200/50 bg-blue-100/40 [transform:translateZ(-22px)_rotate(16deg)] dark:border-blue-300/10 dark:bg-blue-400/10" />

        <div className="relative mb-6 inline-flex rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 [transform:translateZ(28px)] dark:bg-blue-500/10 dark:text-blue-200">
          {icon}
        </div>
        
        <h3 className="relative mb-4 text-2xl font-semibold text-slate-950 transition-colors [transform:translateZ(34px)] group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-200">
          {title}
        </h3>
        
        <p className="relative mb-6 text-base leading-8 text-slate-600 [transform:translateZ(24px)] dark:text-slate-300">
          {description}
        </p>
        
        <div className="relative mb-8 space-y-3 [transform:translateZ(18px)]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-teal-400"></div>
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link
          href={link}
          className="relative inline-flex items-center text-sm font-semibold text-blue-700 [transform:translateZ(30px)] hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
        >
          {cta}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
