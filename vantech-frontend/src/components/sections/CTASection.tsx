'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail, Phone } from 'lucide-react';
import CalendlyButton from '../ui/CalendlyButton';

export default function CTASection() {
  return (
    <section className="section-atmosphere py-20">
      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-lg bg-gradient-to-br from-blue-700 via-cyan-500 to-teal-400 p-[1px] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.65)]"
        >
          <div className="relative overflow-hidden rounded-lg bg-slate-950 px-6 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(34,211,238,0.18),transparent_32%,rgba(167,139,250,0.14)_62%,transparent)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(rgba(96,165,250,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.10)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(0deg,rgba(0,0,0,0.5),transparent)]" />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
                  Ready to grow?
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Let's talk about your next software project.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100/85">
                  Whether you need a new app, a system upgrade, or expert team extension, we're here to help you succeed. Get in touch today and let's build something amazing together.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <CalendlyButton className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-950">
                    Book a Discovery Call
                    <Calendar className="ml-2 h-5 w-5" />
                  </CalendlyButton>
                  <Link
                    href="https://wa.me/254704521408?text=Hi%20Vantech%20Softwares%2C%20I%27d%20like%20to%20discuss%20a%20software%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    WhatsApp us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative z-10 grid gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-5 text-white backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-100/80">Email</p>
                      <p className="font-medium">contact@vantechsoftwares.com</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-5 text-white backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-100/80">Phone</p>
                      <p className="font-medium">+254 704 521 408</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-300/20 bg-blue-400/10 px-5 py-5 text-blue-50 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-200">
                    Why choose us?
                  </p>
                  <p className="mt-3 text-sm leading-7 text-blue-100/90">
                    Experienced team, proven process, reliable delivery. We focus on your success and build software that works.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
