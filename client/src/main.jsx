import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import './styles/main.css';
import './static-bootstrap/assets/vendor/bootstrap/css/bootstrap.min.css';
import './static-bootstrap/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './static-bootstrap/assets/vendor/aos/aos.css';
import './static-bootstrap/assets/vendor/glightbox/css/glightbox.min.css';
import './static-bootstrap/assets/vendor/swiper/swiper-bundle.min.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
