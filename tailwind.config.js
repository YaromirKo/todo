module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "./pages/**/*.vue",
    "./components/**/*.vue",
    "./plugins/**/*.vue",
    "./static/**/*.vue",
    "./store/**/*.vue"
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
