import 'babel-polyfill'
import { getServer } from './server'

getServer()
  .then((server) => {
    return server.start()
      .then(() => server)
  })
  .then((server) => {
    console.log(`Server running at: ${server.info.uri}`) // eslint-disable-line no-console
  })
