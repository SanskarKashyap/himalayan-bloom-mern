# Component Map – Himalayan Blossom MERN Migration

| HTML Section / Feature | React Component(s) | Data / Services / Hooks |
| --- | --- | --- |
| `<body>` wrapper, global providers | `App`, `AppLayout`, `Providers` (LanguageProvider, ThemeProvider, QueryClientProvider?) | `LanguageContext`, `ThemeContext`, `useScrollLock` |
| Preloader `#preloader` | `Preloader` (conditional render based on loading state) | `usePreloader` hook tied to initial asset load |
| Scroll-to-top button `.scroll-top` | `ScrollToTopButton` | `useScrollPosition`, `useScrollToTop` |
| Header (`#header`, nav menus, toggles) | `Header`, `DesktopNav`, `MobileNav`, `LanguageToggle`, `ThemeToggle`, `CallToActionButton` | `useMobileNav`, `useTheme`, `LanguageContext`, `useScrollPosition` |
| Hero (`#hero`) | `HeroSection`, `HeroCTA` | `useAOS`, `assets/img/hero-img.png` |
| Special Offer (`#special-offer`) | `SpecialOfferSection` | Static content via i18n strings |
| About (`#about`) | `AboutSection`, `AboutMedia`, `FounderCard`, `VideoLightbox` | `useGlightbox`, `useAOS`, `LanguageService` |
| Why Us (`#why-us`) | `WhyUsSection`, `WhyHighlight`, `WhyFeatureGrid`, `WhyFeatureCard` | `useAOS`, `LanguageService` |
| Collection / Products (`#collection`) | `CollectionSection`, `ProductGrid`, `ProductCard` | `ApiService.getProducts`, `LanguageService`, fallback static seed |
| Testimonials (`#testimonials`) | `TestimonialsSection`, `TestimonialsCarousel`, `TestimonialCard` | `useSwiper`, `LanguageService` |
| Events / Stories (`#events`) | `WellnessStoriesSection`, `StoryCarousel`, `StoryCard` | `useSwiper`, `LanguageService` |
| Chefs / Team (`#chefs`) | `ArtisansSection`, `ArtisanGrid`, `ArtisanCard` | `LanguageService` |
| Preorder CTA & Form (`#preorder`) | `PreorderSection`, `PreorderForm`, `PreorderSuccessModal` | `ApiService.createPreorder`, `useForm`, optional `CartService` |
| Gallery (`#gallery`) | `GallerySection`, `GalleryGrid`, `GalleryItem` | `useGlightbox`, `useAOS` |
| Contact (`#contact`, forms, map) | `ContactSection`, `ContactDetails`, `ContactForm`, `MapEmbed` | `ApiService.sendContact`, `useForm`, lazy map loader hook |
| Footer (`<footer>`) | `Footer`, `FooterNav`, `SocialLinks` | `LanguageService`, `useScrollToTop` |
| Modal / lightbox helpers | `ModalProvider`, `LightboxPortal` | `useModal`, `useGlightbox` |
| Animations (AOS, Swiper, PureCounter) | Hooks: `useAOS`, `useSwiper`, `useCounter` | Wrap third-party libs, ensure cleanup |
| Language toggles `data-en`/`data-hi` | `LanguageProvider`, `LanguageSwitcher`, JSON dictionaries `en.json`, `hi.json` | `LanguageService` |
| Forms (preorder/contact) | Shared `FormField`, `FormStatus` components | `react-hook-form` or custom hooks |

## Directory Outline

```
client/src/
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── ...
│   ├── sections/
│   │   ├── Hero/
│   │   ├── SpecialOffer/
│   │   ├── About/
│   │   ├── WhyUs/
│   │   ├── Collection/
│   │   ├── Testimonials/
│   │   ├── WellnessStories/
│   │   ├── Artisans/
│   │   ├── Preorder/
│   │   ├── Gallery/
│   │   └── Contact/
│   └── shared/
│       ├── Preloader/
│       ├── ScrollToTopButton/
│       ├── Lightbox/
│       └── Form/
├── hooks/ (useScrollPosition, useMobileNav, useAOS, useSwiper, useLanguage, useTheme, useModal)
├── services/ (ApiService, LanguageService, CartService?)
├── contexts/ (LanguageContext, ThemeContext, ModalContext)
├── styles/ (main.css split or modularized)
├── data/ (products.json seed, testimonials.json, stories.json)
└── i18n/ (en.json, hi.json)
```

This map will guide the incremental migration from the static Bootstrap template into a modular React + Vite front end while keeping behavior encapsulated in hooks and services.
