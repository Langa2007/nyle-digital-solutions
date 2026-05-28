// src/components/sections/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    company: 'TechCorp Inc.',
    content: 'Nyle Digital transformed our legacy systems into a modern microservices architecture. Their team exceeded our expectations in every way.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150',
  },
  {
    name: 'Michael Chen',
    role: 'Product Director',
    company: 'GrowthLabs',
    content: 'The mobile app they developed for us increased user engagement by 300%. Their technical expertise is outstanding.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150',
  },
  {
    name: 'Emma Rodriguez',
    role: 'CEO at HealthTech',
    company: 'HealthTech Solutions',
    content: 'From concept to deployment, Nyle Digital guided us through the entire process. Their cloud infrastructure saved us 40% in hosting costs.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
  },
  {
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'FinServe',
    content: 'The team augmentation service allowed us to scale our engineering team quickly without sacrificing quality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
  },
];

export default function Testimonials() {
  return (
    <section className="section-atmosphere py-20">
      <div className="section-shell relative z-10">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Client confidence
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Teams come to us for clarity, momentum, and polish.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Each engagement is shaped around practical outcomes: cleaner systems, faster launches, stronger interfaces, and fewer handoff surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glass-panel relative h-full overflow-hidden rounded-lg p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                <Quote className="absolute right-5 top-5 h-8 w-8 text-blue-200 dark:text-blue-900" />
                
                <div className="mb-6 flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-slate-950 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4 flex" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
