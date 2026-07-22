import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gewalt: {
          primary: 'var(--gewalt-primary)',
          'primary-hover': 'var(--gewalt-primary-hover)',
          secondary: 'var(--gewalt-secondary)',
          surface: 'var(--gewalt-surface)',
          'surface-alt': 'var(--gewalt-surface-alt)',
          text: 'var(--gewalt-text)',
          'text-muted': 'var(--gewalt-text-muted)',
          border: 'var(--gewalt-border)',
        },
        green: {
          900: '#0D1F15',
          800: '#1A3A2A',
          700: '#234B37',
          600: '#2D5E44',
          500: '#3A7A58',
          400: '#5A9E78',
          300: '#8DC4A3',
          200: '#C2E3D2',
          100: '#E5F3EC',
          50: '#F3FAF6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        condensed: ['var(--font-condensed)', 'sans-serif'],
      },
      maxWidth: {
        site: '1400px',
      },
    },
  },
  plugins: [],
};

export default config;
