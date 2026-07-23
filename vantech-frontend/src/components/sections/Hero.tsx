'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2, Play, Sparkles, Workflow } from 'lucide-react';
import CalendlyButton from '../ui/CalendlyButton';
import Vantech3DScene from './Vantech3DScene';

gsap.registerPlugin(useGSAP);

const deliverySignals = [
  'Strategy, UX, engineering, and launch support in one delivery loop',
  'Web, mobile, cloud, data, automation, and admin systems connected',
  'Glass-clean interfaces backed by maintainable architecture',
];

const launchFlow = ['Discover', 'Prototype', 'Build', 'Scale'];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('.hero-copy > *', {
        opacity: 0,
        y: 24,
        rotateX: -12,
        transformOrigin: '50% 100%',
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
      });
    },
    { scope: heroRef },
  );

  return (
    <section ref={heroRef} className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:min-h-dvh">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(248,250,252,0.58),_rgba(239,246,255,0.30)_42%,_rgba(248,250,252,0.68))] dark:bg-[linear-gradient(180deg,_rgba(2,6,23,0.44),_rgba(15,23,42,0.22)_42%,_rgba(2,6,23,0.72))]" />
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-copy [transform-style:preserve-3d]"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-xl dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
              <Sparkles className="h-4 w-4" />
              Immersive software delivery for teams ready to move
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Stunning digital systems built with product logic and cinematic polish.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Vantech Software Solutions turns business ideas into fast, memorable web apps, mobile products, cloud platforms, and internal tools. The result feels premium on the surface and dependable underneath.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CalendlyButton className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950">
                Book a Discovery Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </CalendlyButton>
              <Link
                href="/#portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 backdrop-blur-xl hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-blue-400/30 dark:hover:text-blue-200 dark:focus:ring-offset-slate-950"
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

            <div className="mt-10 grid max-w-2xl gap-3 rounded-lg border border-white/55 bg-white/45 p-3 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.7)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/35 sm:grid-cols-4">
              {launchFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg border border-white/55 bg-white/55 px-3 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:max-w-xl">
              {[
                { value: '250+', label: 'Projects shipped' },
                { value: '6x', label: 'Faster launch loops' },
                { value: '24/7', label: 'Ops visibility' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-panel rounded-lg px-4 py-5 text-center [transform:translateZ(0)] hover:[transform:translateY(-4px)_rotateX(4deg)]"
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
            className="relative min-h-[420px] [perspective:1200px] lg:min-h-[590px]"
          >
            <div className="absolute left-4 top-5 z-10 hidden rounded-lg border border-white/20 bg-slate-950/55 px-4 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl sm:inline-flex">
              <Workflow className="mr-2 h-4 w-4 text-cyan-200" />
              Live system map
            </div>
            <div className="absolute -inset-10 -z-10 rounded-lg bg-[conic-gradient(from_200deg,_rgba(34,211,238,0.22),_rgba(167,139,250,0.18),_rgba(251,191,36,0.14),_rgba(52,211,153,0.16),_rgba(34,211,238,0.22))] blur-3xl animate-[spin_18s_linear_infinite]" />
            <Vantech3DScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
