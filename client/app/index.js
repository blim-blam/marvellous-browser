if (!window.fetch) {
  require.ensure([], (require) => {
    require('whatwg-fetch')
    require('./bootstrap')
  }, 'polyfill')
} else {
  require('./bootstrap')
}
