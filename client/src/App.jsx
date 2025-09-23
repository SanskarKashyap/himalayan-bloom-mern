import { Component } from 'react';
import Header from './components/layout/Header/Header.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import SpecialOffer from './components/sections/SpecialOffer/SpecialOffer.jsx';
import AboutSection from './components/sections/About/AboutSection.jsx';
import WhyUsSection from './components/sections/WhyUs/WhyUsSection.jsx';
import CollectionSection from './components/sections/Collection/CollectionSection.jsx';
import TestimonialsSection from './components/sections/Testimonials/TestimonialsSection.jsx';
import StoriesSection from './components/sections/Stories/StoriesSection.jsx';
import ArtisansSection from './components/sections/Artisans/ArtisansSection.jsx';
import PreorderSection from './components/sections/Preorder/PreorderSection.jsx';
import GallerySection from './components/sections/Gallery/GallerySection.jsx';
import ContactSection from './components/sections/Contact/ContactSection.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import ScrollTopButton from './components/shared/ScrollTopButton/ScrollTopButton.jsx';
import Preloader from './components/shared/Preloader/Preloader.jsx';
import { useAOS } from './hooks/useAOS.js';
import { useLightbox } from './hooks/useLightbox.js';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import fallbackHtml from './static-bootstrap/index.html?raw';

import './App.css';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App rendering error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

function FallbackStaticMarkup() {
  return <div dangerouslySetInnerHTML={{ __html: fallbackHtml }} />;
}

function AppShell() {
  useAOS();
  useLightbox({ selector: '.glightbox' });

  return (
    <div className="hb-app">
      <Preloader />
      <Header />
      <main>
        <Hero />
        <SpecialOffer />
        <AboutSection />
        <WhyUsSection />
        <CollectionSection />
        <TestimonialsSection />
        <StoriesSection />
        <ArtisansSection />
        <PreorderSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary fallback={<FallbackStaticMarkup />}>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </AppErrorBoundary>
  );
}
