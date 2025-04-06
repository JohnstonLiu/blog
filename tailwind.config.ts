/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-computer-modern)'],
        mono: ['Roboto Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-computer-modern)',
            },
            'code, pre': {
              fontFamily: 'var(--font-roboto-mono), Roboto Mono, monospace',
            },
            'pre code': {
              fontSize: '0.875rem',
            },
            'code': {
              fontSize: '0.875rem',
            },
            // You can customize typography styles here
            maxWidth: 'none', // Prevents prose from constraining width
          },
        },
      },
    },
  },
  plugins: [
    '@tailwindcss/typography',
  ],
}