'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, ShieldCheck, Sparkles } from 'lucide-react';

const deliverySignals = [
  'Expert teams delivering excellence from day one',
  'Scalable solutions across web, mobile, and cloud',
  'Complete support from launch through success',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_35%),radial-gradient(circle_at_80%_12%,_rgba(14,165,233,0.16),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(239,246,255,0.72)_36%,_rgba(255,255,255,0.96))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_34%),radial-gradient(circle_at_80%_12%,_rgba(14,165,233,0.14),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.92)_38%,_rgba(2,6,23,0.98))]" />
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
              <Sparkles className="h-4 w-4" />
              Custom software that drives real business results
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Scalable software solutions built for growth, delivered on time, every time.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              We transform your vision into powerful software. From cutting-edge web and mobile apps to enterprise systems, we deliver solutions that accelerate your business and impress your users.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
              >
                Book a Discovery Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-blue-400/30 dark:hover:text-blue-200"
              >
                See Recent Work
                <Play className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-3">
              {deliverySignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:max-w-xl">
              {[
                { value: '250+', label: 'Projects shipped' },
                { value: '99%', label: 'Client retention confidence' },
                { value: '24/7', label: 'Support coverage' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-panel rounded-3xl px-5 py-5 text-center"
                >
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-blue-600/20 blur-3xl" />
            <div className="glass-panel rounded-[2rem] p-6 blue-glow">
              <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-950 px-6 py-6 text-slate-50 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-blue-200">
                      Delivery board
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Client launch pulse</h2>
                  </div>
                  <div className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-100">
                    Live alignment
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Discovery', value: '02 days' },
                    { label: 'Prototype', value: '07 days' },
                    { label: 'Launch prep', value: '94%' },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        {metric.label}
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">System health</p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        Stable product pipeline
                      </p>
                    </div>
                    <ShieldCheck className="h-10 w-10 text-blue-300" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      { name: 'Frontend experience', value: '92%' },
                      { name: 'Backend readiness', value: '96%' },
                      { name: 'Admin operations', value: '89%' },
                    ].map((row) => (
                      <div key={row.name}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-300">{row.name}</span>
                          <span className="text-blue-200">{row.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                            style={{ width: row.value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
