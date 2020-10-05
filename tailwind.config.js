module.exports = {
  mode: 'layers',
  layers: ['base', 'components', 'utilities'],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    minHeight: {
      'screen-95': '95vh'
    },
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus'],
    },
    extend: {
      borderRadius: {
        'input-text': '0.75rem'
      },
      spacing: {
        '22': '5.563rem'
      }
    },
  },
  variants: {},
  plugins: [],
}
