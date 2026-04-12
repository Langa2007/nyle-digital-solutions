import Hero from '@/components/sections/Hero';
import Services from '@/app/services/page';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Stats from '@/components/sections/Stats';
import CTASection from '@/components/sections/CTASection';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <>
      <Hero />
      <div id="services" className="scroll-mt-28">
        <Services />
      </div>
      <div id="impact" className="scroll-mt-28">
        <Stats />
      </div>
      <div id="portfolio" className="scroll-mt-28">
        <Portfolio />
      </div>
      <div id="testimonials" className="scroll-mt-28">
        <Testimonials />
      </div>
      <div id="insights" className="scroll-mt-28">
        <BlogSection />
      </div>
      <div id="contact" className="scroll-mt-28">
        <CTASection />
      </div>
    </>
  );
}
