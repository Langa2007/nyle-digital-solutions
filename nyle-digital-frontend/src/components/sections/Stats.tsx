// src/components/sections/Stats.tsx
'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Code, Globe, Award } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: 250,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Served across 30+ countries',
  },
  {
    icon: <Code className="h-8 w-8" />,
    value: 500,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Successful implementations',
  },
  {
    icon: <Globe className="h-8 w-8" />,
    value: 24,
    suffix: '/7',
    label: 'Support Coverage',
    description: 'Round-the-clock service',
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: 50,
    suffix: '+',
    label: 'Team Experts',
    description: 'Certified professionals',
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-blue-600">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Years of excellence, proven by results and satisfied clients worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                {stat.icon}
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}