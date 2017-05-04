import hapi from 'hapi'
import bunyan from 'bunyan'
import { graphiqlHapi, graphqlHapi } from 'graphql-server-hapi'
import { schema } from './schema/index'
import { config } from './config'

const server = new hapi.Server()

server.connection({
  host: 'localhost',
  port: config.get('PORT')
})

server.register([
    {
      register: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        }
      }
    }, {
      register: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema: schema
        },
        route: {
          cors: true
        }
      }
    },
    {
      register: require('hapi-bunyan'),
      options: {
        logger: bunyan.createLogger({name: 'marvellous-browser', level: 'debug'})
      }
    }
  ],
  () =>
    server.start((err) => {
      if (err) {
        throw err
      }

      console.log(`Server running at: ${server.info.uri}`) // eslint-disable-line no-console
    })
)

