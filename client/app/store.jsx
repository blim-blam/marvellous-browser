import fetchIntercept from 'fetch-intercept'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { client } from './client'
import identity from 'ramda/src/identity'
import { routerReducer } from 'react-router-redux'
import Progress from 'react-progress-2'

const DEVELOPMENT = process.env.NODE_ENV === 'development'

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routing: routerReducer
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

