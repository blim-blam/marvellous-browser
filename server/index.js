import 'babel-polyfill'
import { getServer } from './server'
import Raven from 'raven'
import {config} from './config'

if (config.get('RAVEN_URL_BACKEND')) {
  Raven.config(config.get('RAVEN_URL_BACKEND')).install();
}


getServer()
  .then((server) => {
    return server.start()
      .then(() => server)
  })
  .then((server) => {
    console.log(`Server running at: ${server.info.uri}`) // eslint-disable-line no-console
  })
