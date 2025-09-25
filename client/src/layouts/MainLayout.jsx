import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header/Header.jsx';
import Footer from '../components/layout/Footer/Footer.jsx';
import ScrollTopButton from '../components/shared/ScrollTopButton/ScrollTopButton.jsx';
import AuthDialog from '../components/auth/AuthDialog.jsx';
import Preloader from '../components/shared/Preloader/Preloader.jsx';

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <AuthDialog />
      <Preloader />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
