import {bootstrap} from './bootstrap'

/**
 * We should not punish users who use modern browsers by forcing them to download polyfills.
 *
 * The idea here is to determine whether the fetch polyfill is required, and dynamically load it if necessary.
 *
 * Unfortunately apollo-client and fetch-interceptor also import the fetch polyfill, which causes Webpack to ignore this attempt to split the polyfill out
 *
 * @TODO Submit PR's that stop apollo-client and fetch-interceptor from importing whatwg-fetch
 */
if (!('searchParams' in HTMLAnchorElement.prototype)) {
  require.ensure([], (require) => {
    require('url-search-params')
  }, 'polyfill-url-search-params')
}

if (!window.fetch) {
  require.ensure([], (require) => {
    require('whatwg-fetch')
    require('url-search-params')
    bootstrap()
  }, 'polyfill-fetch')
} else {
  bootstrap()
}
