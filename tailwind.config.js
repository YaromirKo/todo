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
    minHeight: {
      '40': '40px'
    },
    minWidth: {
      '3': '40px'
    },
    extend: {
      colors: {
        creator: '#383838',
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto'
      },
      borderRadius: {
        'input-text': '0.25rem'
      },
      spacing: {
        '22': '5.563rem'
      }
    },
  },
  variants: {},
  plugins: [],
}
