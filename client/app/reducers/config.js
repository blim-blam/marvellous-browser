import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  // promise middleware
  applyMiddleware(loadingBarMiddleware())
)
