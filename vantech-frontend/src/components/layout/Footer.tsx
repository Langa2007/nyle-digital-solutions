import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import CalendlyButton from '../ui/CalendlyButton';

const siteLinks = [
  { name: 'Services', href: '/#services' },
  { name: 'Impact', href: '/#impact' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Insights', href: '/#insights' },
  { name: 'Contact', href: '/#contact' },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/vantechsoftwares',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/vantechsoftwares',
    label: 'GitHub',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-atmosphere z-20">
      <div className="section-shell relative z-10 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="glass-panel rounded-lg px-6 py-8 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="blue-glow flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/70 dark:ring-white/10">
                <Image
                  src="/vantech-favicon.png"
                  alt="Vantech Softwares logo"
                  width={112}
                  height={112}
                  className="h-full w-full scale-[2.25] object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-blue-600 dark:text-amber-200">
                  Vantech Softwares
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Software, cloud, and admin systems in sync
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              We build custom software solutions that help businesses grow. From web apps to complex systems, we deliver quality code and exceptional service.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200/70 bg-white/80 px-5 py-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-amber-200" />
                  contact@vantechsoftwares.com
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-amber-200" />
                  +254 704 521408
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-amber-200" />
                  Nairobi, Kenya
                </div>
              </div>

              <div className="rounded-lg border border-blue-200/80 bg-blue-50 px-5 py-5 text-slate-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-700 dark:text-amber-100">
                  Get Started
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200">
                  Have a project in mind? Let's discuss your ideas and bring your vision to life.
                </p>
                <CalendlyButton className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-amber-200 dark:hover:text-amber-100">
                  Book a Call now
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </CalendlyButton>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel rounded-lg px-6 py-8">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                Explore
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {siteLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-amber-100"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-stone-900/80 px-6 py-5 backdrop-blur-xl">
              <p className="text-sm text-slate-400">
                &copy; {currentYear} Vantech Software Solutions
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 hover:border-amber-400/30 hover:text-amber-100"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
