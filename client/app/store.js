import { hideLoading, loadingBarReducer, showLoading } from 'react-redux-loading-bar'
import fetchIntercept from 'fetch-intercept'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { client } from './client'

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    // displayTab: displayTabReducer,
    // comics: comicsReducer,
    loadingBar: loadingBarReducer
  }),
  {
    displayTab: 'comics',
    comics: {
      start: 0,
      limit: 30
    }
  },
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() :
      f => f
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

