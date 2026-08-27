/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        stripe: {
          navy: '#0A2540',
          slate: '#425466',
          blurple: '#635BFF',
          blurpleDark: '#4b44c0',
          bg: '#F6F9FC',
          divider: '#E6EBF1',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      typography: (theme) => ({
        stripe: {
          css: {
            '--tw-prose-body': theme('colors.stripe.slate'),
            '--tw-prose-headings': theme('colors.stripe.navy'),
            '--tw-prose-links': theme('colors.stripe.blurple'),
            '--tw-prose-bold': theme('colors.stripe.navy'),
            '--tw-prose-quotes': theme('colors.stripe.navy'),
            '--tw-prose-quote-borders': theme('colors.stripe.blurple'),
            '--tw-prose-code': theme('colors.stripe.navy'),
            maxWidth: '680px',
            a: {
              fontWeight: '600',
              textDecoration: 'none',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            h2: {
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h3: {
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '500',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
            },
            img: {
              borderRadius: theme('borderRadius.lg'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}