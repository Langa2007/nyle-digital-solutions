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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="glass-panel h-full rounded-[2rem] p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-300 dark:group-hover:border-blue-400/30">
        <div className="mb-6 inline-flex rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
          {icon}
        </div>
        
        <h3 className="mb-4 text-2xl font-semibold text-slate-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-200">
          {title}
        </h3>
        
        <p className="mb-6 text-base leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
        
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link
          href={link}
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
        >
          {cta}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
