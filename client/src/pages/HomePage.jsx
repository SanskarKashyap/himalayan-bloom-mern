import Hero from '../components/sections/Hero/Hero.jsx';
import SpecialOffer from '../components/sections/SpecialOffer/SpecialOffer.jsx';
import WhyUsSection from '../components/sections/WhyUs/WhyUsSection.jsx';
import TestimonialsSection from '../components/sections/Testimonials/TestimonialsSection.jsx';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-28">
      <Hero />
      <SpecialOffer />
      <WhyUsSection />
      <TestimonialsSection />
    </div>
  );
}
