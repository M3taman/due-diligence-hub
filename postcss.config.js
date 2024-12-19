export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: false,
        }]
      },
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './public/index.html'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }
    } : {})
  },
}