import { makeExecutableSchema } from 'graphql-tools'
import Schema from './schema.js'
import {resolvers} from './resolvers'

const schema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: resolvers
})

export {schema}