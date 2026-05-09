/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f8f9fb',
          100: '#eef0f4',
          200: '#dde1ea',
          300: '#bac1d1',
          400: '#8e97ad',
          500: '#646e87',
          600: '#4a5169',
          700: '#363c50',
          800: '#22273a',
          900: '#11131f',
        },
        accent: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b6d4ff',
          300: '#84b6ff',
          400: '#4f8eff',
          500: '#2a6bf2',
          600: '#1a52d6',
          700: '#1841ad',
          800: '#173a8b',
          900: '#15336e',
        },
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15,23,42,0.04), 0 4px 14px rgba(15,23,42,0.06)',
        lift: '0 1px 3px rgba(15,23,42,0.06), 0 12px 32px rgba(15,23,42,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 280ms ease-out',
        fadeIn: 'fadeIn 200ms ease-out',
      },
    },
  },
  plugins: [],
};
