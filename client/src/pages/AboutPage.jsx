import AboutSection from '../components/sections/About/AboutSection.jsx';
import ArtisansSection from '../components/sections/Artisans/ArtisansSection.jsx';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-28">
      <AboutSection />
      <ArtisansSection />
    </div>
  );
}
