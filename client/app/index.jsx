import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPQL_ENDPOINT
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root'))
