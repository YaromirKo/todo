module.exports = {
  mode: 'layers',
  layers: ['base', 'components', 'utilities'],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus'],
    },
    extend: {
      gridTemplateRows: {
        'layout': 'auto 1fr auto'
      },
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
