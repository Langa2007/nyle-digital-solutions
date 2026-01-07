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
      <div className="h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
        <div className="text-4xl mb-6">{icon}</div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>
        
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link
          href={link}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 group"
        >
          {cta}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}