import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

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
    href: 'https://linkedin.com/company/nyledigital',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/nyledigital',
    label: 'GitHub',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="section-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="blue-glow flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-lg font-semibold text-white">
                N
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                  Nyle Digital
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Software, cloud, and admin systems in sync
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              The refreshed experience keeps the blue brand language, but gives it
              more structure, clearer navigation, and stronger alignment between the
              public site, backend services, and admin workflows.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/80 px-5 py-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  contact@nyledigital.com
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  +254 700 000 000
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  Nairobi, Kenya
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-blue-200/80 bg-blue-50 px-5 py-5 text-slate-900 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-700 dark:text-blue-200">
                  Delivery note
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200">
                  Shared environment config now drives the frontend, backend, and admin
                  routing path from one root `.env`.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel rounded-[2rem] px-6 py-8">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                Explore
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {siteLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-blue-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {adminUrl ? (
                <a
                  href={adminUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:text-blue-200"
                >
                  Open Admin Portal
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-slate-900 px-6 py-5">
              <p className="text-sm text-slate-400">
                &copy; {currentYear} Nyle Digital Solutions
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 hover:border-blue-400/30 hover:text-blue-200"
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
