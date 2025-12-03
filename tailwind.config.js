/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#9c5cf6',
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    /**
     * Custom utilities for NativeWind
     * `glass-card` reproduces frosted-glass effect with border, shadow and smooth transition.
     */
    require('tailwindcss/plugin')(function ({ addUtilities, theme }) {
      addUtilities(
        {
          '.glass-card': {
            /* shape */
            borderRadius: theme('borderRadius.2xl'),
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',

            /* transition */
            transitionProperty: theme('transitionProperty.colors'),
            transitionDuration: theme('transitionDuration.DEFAULT'),
            transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),

            /* shadow */
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },

            /* backdrop / blur */
            backdropFilter: 'blur(12px) saturate(1.5) brightness(1.05)',
          },
        },
        {
          layer: 'utilities',
        },
      );
    }),
  ],
};

