module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('precss')(),
    require('lost')(),
    require('postcss-responsive-type')(),
    require('postcss-font-magician')({
      hosted: ['./public/fonts', '/fonts'],
      variants: {
        'Monoton': {
          '400': []
        },
        'Open Sans': {
          '400': [],
          '400i': [],
          '700': [],
          '700i': []
        }
      },
      foundries: ['google']
    }),
    require('autoprefixer')()
  ]
}
