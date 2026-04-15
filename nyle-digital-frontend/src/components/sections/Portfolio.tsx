'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Image } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const portfolioApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function Portfolio() {
  const { data: projects = [] } = useQuery({
    queryKey: ['portfolio-items'],
    queryFn: () =>
      portfolioApi
        .get('/portfolio')
        .then((res) => res.data.data || []),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return (
    <section className="bg-slate-50/75 py-20 dark:bg-slate-950/40">
      <div className="section-shell">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Our Recent Work
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Projects that showcase our technical expertise.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
            See how we've helped businesses like you build winning digital products. From concept to launch, we deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects && projects.length > 0 ? (
            projects.map((project: any, index: number) => (
              <motion.article
                key={project.id || project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-panel overflow-hidden rounded-[2rem]">
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    {project.featuredImage ? (
                      <img
                        src={project.featuredImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                        <Image className="h-12 w-12 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                      <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                        {project.category || 'Project'}
                      </span>
                      <span className="rounded-full border border-white/25 bg-slate-950/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        Live in production
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
                      {project.technologies &&
                        project.technologies.length > 0 &&
                        project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <BadgeCheck className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                        Delivered and thriving
                      </div>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                      >
                        Build something similar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-slate-600">Loading portfolio projects...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
