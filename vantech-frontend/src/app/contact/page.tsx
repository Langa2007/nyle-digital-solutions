import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us | Vantech Software Solutions',
  description: 'Get in touch with Vantech Software Solutions for your next digital product, web platform, or cloud infrastructure project.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vantech Software Solutions',
    description: 'Contact us for software development and cloud services.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Vantech Software Solutions',
      telephone: '+254704521408',
      email: 'contact@vantechsoftwares.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE'
      }
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen section-atmosphere">
      <JsonLd data={jsonLd} />
      <div className="section-shell relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-amber-200">
              Get in Touch
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              Let's build something amazing together.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Whether you need a custom web application, cloud infrastructure setup, or digital transformation consulting, our team is ready to help you succeed. Fill out the form or reach out directly.
            </p>
            
            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-100 dark:bg-amber-500/10 p-3 rounded-lg text-blue-600 dark:text-amber-200">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-950 dark:text-white">Email Us</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">We aim to respond within 24 hours.</p>
                  <a href="mailto:contact@vantechsoftwares.com" className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700 dark:text-amber-200 dark:hover:text-amber-100">
                    contact@vantechsoftwares.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-100 dark:bg-amber-500/10 p-3 rounded-lg text-blue-600 dark:text-amber-200">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-950 dark:text-white">Call Us</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">Mon-Fri from 9am to 6pm EAT.</p>
                  <a href="tel:+254704521408" className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700 dark:text-amber-200 dark:hover:text-amber-100">
                    +254 704 521408
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-100 dark:bg-amber-500/10 p-3 rounded-lg text-blue-600 dark:text-amber-200">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-950 dark:text-white">Visit Us</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">Come say hello at our office.</p>
                  <p className="mt-2 font-medium text-slate-900 dark:text-slate-200">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-10 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
