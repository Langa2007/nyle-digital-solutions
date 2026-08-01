import { Metadata } from 'next';
import BlogSection from '@/components/sections/BlogSection';

export const metadata: Metadata = {
  title: 'Insights & Articles | Vantech Software Solutions',
  description: 'Notes from delivery, platform work, and interface refinement. Read our latest articles and insights.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen">
      <BlogSection />
    </div>
  );
}
