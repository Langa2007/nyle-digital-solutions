import { Metadata } from 'next';
import ServicesContent from '@/components/sections/ServicesContent';

export const metadata: Metadata = {
  title: 'Services | Vantech Software Solutions',
  description: 'Custom software delivery, web platforms, mobile products, cloud infrastructure, and digital transformation services.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage({ embedded = false }: { embedded?: boolean } = {}) {
  return <ServicesContent embedded={embedded} />;
}
