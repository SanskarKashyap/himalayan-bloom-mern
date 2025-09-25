import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { useAOS } from './hooks/useAOS.js';
import { useLightbox } from './hooks/useLightbox.js';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
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

function RoutedApp() {
  useAOS();
  useLightbox({ selector: '.glightbox' });

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:slug" element={<ProductDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppErrorBoundary fallback={<FallbackStaticMarkup />}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <RoutedApp />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  );
}
