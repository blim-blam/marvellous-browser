import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { ApolloProvider } from 'react-apollo'
import { browserHistory, Route, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { store } from './store'
import { client } from './client.jsx'
import Comics from './components/comics/Comics'
import Comic from './components/comics/comic/Comic'

ReactDOM.render(
  <ApolloProvider client={client}
                  store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/"
             component={App}>
        <Route path="/comics"
               component={Comics}>
          <Route path="/comics/:id"
                 component={(props) => <Comic id={props.params.id} />}/>
        </Route>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'))
