import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import fetchIntercept from 'fetch-intercept'
import { hideLoading, loadingBarReducer, showLoading } from 'react-redux-loading-bar'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPQL_ENDPOINT
  })
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    displayTab: displayTabReducer,
    comics: comicsReducer,
    loadingBar: loadingBarReducer,
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
  request: function (
    url,
    config
  ) {
    store.dispatch(showLoading())
    return [url, config]
  },

  requestError: function (error) {
    store.dispatch(hideLoading())
    return Promise.reject(error)
  },

  response: function (response) {
    store.dispatch(hideLoading())
    return response
  },

  responseError: function (error) {
    store.dispatch(hideLoading())
    return Promise.reject(error)
  }
})

ReactDOM.render(
  <ApolloProvider client={client}
                  store={store}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root'))
