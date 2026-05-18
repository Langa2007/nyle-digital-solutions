'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';
import CalendlyButton from '../ui/CalendlyButton';
import Nyle3DScene from './Nyle3DScene';

gsap.registerPlugin(useGSAP);

const deliverySignals = [
  'Expert teams delivering excellence from day one',
  'Scalable solutions across web, mobile, and cloud',
  'Complete support from launch through success',
];

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
    <section ref={heroRef} className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(248,250,252,0.58),_rgba(239,246,255,0.30)_42%,_rgba(248,250,252,0.68))] dark:bg-[linear-gradient(180deg,_rgba(2,6,23,0.44),_rgba(15,23,42,0.22)_42%,_rgba(2,6,23,0.72))]" />
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-copy [transform-style:preserve-3d]"
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
              <CalendlyButton className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700">
                Book a Discovery Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </CalendlyButton>
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
                  className="glass-panel rounded-3xl px-5 py-5 text-center [transform:translateZ(0)] hover:[transform:translateY(-6px)_rotateX(5deg)]"
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
            className="relative min-h-[420px] [perspective:1200px] lg:min-h-[560px]"
          >
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[conic-gradient(from_130deg,_rgba(37,99,235,0.22),_rgba(20,184,166,0.18),_rgba(251,191,36,0.13),_rgba(37,99,235,0.22))] blur-3xl" />
            <Nyle3DScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
