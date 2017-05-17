import hapi from 'hapi'
import { graphiqlHapi, graphqlHapi } from 'graphql-server-hapi'
import { schema } from './schema/index'
import { config } from './config'
import bunyan from 'bunyan'
import hapiBunyan from 'hapi-bunyan'
import inert from 'inert'
import staticServer from './plugins/static'

export const getServer = async () => {
  const server = new hapi.Server()

  server.connection({
    host: config.get('HOST'),
    port: config.get('PORT')
  })

  const graphiQLPlugin = {
    register: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      }
    }
  }

  const plugins = [
    {
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
      register: require('hapi-prerender'),
      options: {
        serviceUrl: config.get('PRERENDER_URL')
      }
    },
    {
      register: inert
    },
    {
      register: staticServer,
      options: {}
    },
    {
      register: hapiBunyan,
      options: {
        logger: bunyan.createLogger({
          name: 'marvellous-browser',
          level: 'debug'
        })
      }
    }
  ]

  if (config.get('NODE_ENV') !== 'production') {
    plugins.push(graphiQLPlugin)
  }

  await server.register(plugins)

  return server
}

