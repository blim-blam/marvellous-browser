import fetchIntercept from 'fetch-intercept'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { client } from './client'
import { routerReducer } from 'react-router-redux'
import Progress from 'react-progress-2'

const middleware = [client.middleware()]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-freeze'))
  middleware.push(require('redux-logger'))
}

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routing: routerReducer
  }),
  {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

fetchIntercept.register({
  request: (
    url,
    config
  ) => {
    Progress.show()
    return [url, config]
  },

  requestError: (error) => {
    Progress.hide()
    return Promise.reject(error)
  },

  response: (response) => {
    Progress.hide()
    return response
  },

  responseError: (error) => {
    Progress.hide()
    return Promise.reject(error)
  }
})

