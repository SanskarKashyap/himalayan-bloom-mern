import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'royal-cream': '#f8f5ef',
        'royal-ink': '#2e254d',
        'royal-heading': '#1b1633',
        'royal-muted': '#6f678d',
        'royal-night': '#0f0a1f',
        'royal-night-soft': '#171329',
        'royal-gold': '#d4af37',
        'royal-gold-soft': 'rgba(212, 175, 55, 0.12)',
        'royal-plum': '#3c305d',
        'royal-white': '#ffffff',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        heading: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        accent: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        royal: '0 24px 60px rgba(29, 22, 53, 0.14)',
        'royal-soft': '0 16px 32px rgba(212, 175, 55, 0.32)',
        'royal-glow': '0 0 0 1px rgba(212, 175, 55, 0.16), 0 18px 40px rgba(15, 10, 31, 0.28)',
      },
      transitionTimingFunction: {
        'soft-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'royal-gradient': 'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.18) 0%, rgba(255, 255, 255, 0) 55%), radial-gradient(circle at 80% 0%, rgba(33, 27, 63, 0.12) 0%, rgba(255, 255, 255, 0) 45%)',
      },
      maxWidth: {
        'content-wide': '110rem',
      },
    },
  },
  plugins: [],
};
