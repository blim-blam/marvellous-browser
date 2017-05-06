import hapi from 'hapi'
import { graphiqlHapi, graphqlHapi } from 'graphql-server-hapi'
import { schema } from './schema/index'
import { config } from './config'
import bunyan from 'bunyan'
import hapiBunyan from 'hapi-bunyan'

export const getServer = async () => {
  const server = new hapi.Server()

  server.connection({
    host: config.get('HOST'),
    port: config.get('PORT')
  })

  await server.register([
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
      register: hapiBunyan,
      options: {
        logger: bunyan.createLogger({name: 'marvellous-browser', level: 'debug'})
      }
    }
  ])

  return server
}

