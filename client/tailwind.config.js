/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boutique: {
          blush: '#FFF5F6',
          blushLight: '#FDF7F8',
          blushMedium: '#FCE7EA',
          pink: '#E08E9D',
          rose: '#C86D80',
          deepRose: '#9E3B53',
          berry: '#7A223B',
          charcoal: '#1A1819',
          charcoalLight: '#2C2829',
          warmGray: '#8C8587',
          lightGray: '#F7F6F6',
          gold: '#C5A880'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(122, 34, 59, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(122, 34, 59, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
