// src/app/page.tsx
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Stats from '@/components/sections/Stats';
import CTASection from '@/components/sections/CTASection';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      <BlogSection />
      <CTASection />
    </>
  );
}