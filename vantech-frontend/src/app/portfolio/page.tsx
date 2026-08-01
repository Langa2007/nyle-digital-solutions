import { Metadata } from 'next';
import Portfolio from '@/components/sections/Portfolio';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Vantech Software Solutions',
  description: 'See how we have helped businesses build winning digital products. From concept to launch, we deliver results.',
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Vantech Software Solutions Portfolio',
        url: 'https://vantechsoftwares.vercel.app/portfolio'
      }
    ]
  };

  return (
    <div className="pt-24 min-h-screen">
      <JsonLd data={jsonLd} />
      <Portfolio />
    </div>
  );
}
