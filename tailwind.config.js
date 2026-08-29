/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F6F6F4',
        'page-soft': '#FAFAFA',
        'warm-tint': '#FDF8F4',
        ink: '#111827',
        'ink-soft': '#1F2937',
        muted: '#6B7280',
        faint: '#9CA3AF',
        gold: '#D4A853',
        'gold-deep': '#B45309',
        cream: '#FEF3C7',
        sand: '#F5E6D3',
        coral: '#F87171',
        hairline: 'rgba(17,17,17,0.07)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '12px',
        md: '20px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.05)',
        ambient: '0 20px 70px rgba(30,20,10,0.07)',
        lift: '0 6px 30px rgba(0,0,0,0.07)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
