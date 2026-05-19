'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CalendlyButton from '../ui/CalendlyButton';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Impact', href: '/#impact' },
  { name: 'Work', href: '/#portfolio' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Insights', href: '/#insights' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="blue-glow flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-lg font-semibold text-white">
                N
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                  Nyle Digital
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Product systems and cloud delivery
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-blue-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              <CalendlyButton className="hidden rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 lg:inline-flex">
                Book a Call
              </CalendlyButton>

              <button
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="space-y-2 pb-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <CalendlyButton
                  className="block w-full rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Book a Call
                </CalendlyButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
