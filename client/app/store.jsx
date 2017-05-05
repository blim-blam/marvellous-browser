import { hideLoading, loadingBarReducer, showLoading } from 'react-redux-loading-bar'
import fetchIntercept from 'fetch-intercept'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { client } from './client.jsx'
import identity from 'ramda/src/identity'
import { routerReducer } from 'react-router-redux'

const DEVELOPMENT = process.env.NODE_ENV === 'development'

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routing: routerReducer,
    loadingBar: loadingBarReducer
  }),
  {},
  compose(
    applyMiddleware(
      client.middleware(),
      DEVELOPMENT ? require('redux-freeze') : identity,
      DEVELOPMENT ? require('redux-logger').createLogger() : identity
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

fetchIntercept.register({
  request: (
    url,
    config
  ) => {
    store.dispatch(showLoading())
    return [url, config]
  },

  requestError: (error) => {
    store.dispatch(hideLoading())
    return Promise.reject(error)
  },

  response: (response) => {
    store.dispatch(hideLoading())
    return response
  },

  responseError: (error) => {
    store.dispatch(hideLoading())
    return Promise.reject(error)
  }
})

