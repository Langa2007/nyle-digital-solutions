import { Metadata } from 'next';
import CareersSection from '@/components/sections/CareersSection';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Careers | Vantech Software Solutions',
  description: 'Join our team of engineers, designers, and strategists. Build the future of digital products with us.',
  alternates: {
    canonical: '/careers',
  },
};

export default function CareersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at Vantech Software Solutions',
    description: 'Job openings and career opportunities at Vantech Software Solutions.',
  };

  return (
    <div className="pt-24 min-h-screen">
      <JsonLd data={jsonLd} />
      <CareersSection />
    </div>
  );
}
