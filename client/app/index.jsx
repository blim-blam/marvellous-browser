import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { ApolloProvider } from 'react-apollo'

import {store} from './store.js'
import {client} from './cilent'

ReactDOM.render(
  <ApolloProvider client={client}
                  store={store}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root'))
