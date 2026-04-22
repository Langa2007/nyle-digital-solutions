'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-[1px] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.65)]"
        >
          <div className="rounded-[2.4rem] bg-slate-950 px-6 py-10 sm:px-10 sm:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
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
                  <Link
                    href="https://wa.me/254704521408?text=Hi%20Nyle%20Digital%2C%20I%27d%20like%20to%20discuss%20a%20software%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600"
                  >
                    Chat on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="mailto:contact@nyledigital.com"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Email us
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-100/80">Email</p>
                      <p className="font-medium">contact@nyledigital.com</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-100/80">Phone</p>
                      <p className="font-medium">+254 704 521 408</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-blue-300/20 bg-blue-400/10 px-5 py-5 text-blue-50">
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
