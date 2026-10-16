/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'deep-ocean': '#005070',
          'ocean-teal': '#00909A',
          'tropical-aqua': '#00C8C0',
          'coral-energy': '#FF6B54',
          'warm-sand': '#F8D898',
          'seafoam-mist': '#E8F8F6',
        },
        // Semantic aliases
        ocean: {
          950: '#002535',
          900: '#00364C',
          800: '#005070', // Primary Deep Ocean
          700: '#006B85',
          600: '#00909A', // Ocean Teal
          500: '#00A8A6',
          400: '#00C8C0', // Tropical Aqua
          300: '#4DDCD6',
          200: '#99ECE8',
          100: '#D5F7F5',
          50: '#E8F8F6',  // Seafoam Mist
        },
        coral: {
          600: '#E04E38',
          500: '#FF6B54', // Coral Energy
          400: '#FF8874',
          300: '#FFAA9B',
          100: '#FFE8E4',
          50: '#FFF5F3',
        },
        sand: {
          600: '#C7A258',
          500: '#E0BA6F',
          400: '#F8D898', // Warm Sand
          300: '#FBE3B3',
          200: '#FDF0D5',
          100: '#FFF9ED',
          50: '#FFFDFA',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.03em',
        'editorial': '0.12em',
        'super-wide': '0.25em',
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '5/4': '5 / 4',
        '3/4': '3 / 4',
        '16/10': '16 / 10',
      },
      boxShadow: {
        'editorial': '0 2px 10px -2px rgba(0, 80, 112, 0.06), 0 12px 28px -6px rgba(0, 80, 112, 0.10)',
        'editorial-hover': '0 6px 16px -2px rgba(0, 80, 112, 0.08), 0 24px 44px -8px rgba(0, 80, 112, 0.18)',
        'paper': '0 1px 3px rgba(0, 54, 76, 0.04), 0 10px 26px -6px rgba(0, 80, 112, 0.08)',
        'luxury': '0 10px 30px -10px rgba(0, 80, 112, 0.12), 0 4px 6px -2px rgba(0, 80, 112, 0.04)',
        'luxury-hover': '0 20px 40px -15px rgba(0, 80, 112, 0.22), 0 8px 12px -4px rgba(0, 80, 112, 0.08)',
        'coral-glow': '0 8px 20px -4px rgba(255, 107, 84, 0.35)',
        'teal-glow': '0 8px 20px -4px rgba(0, 144, 154, 0.30)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
