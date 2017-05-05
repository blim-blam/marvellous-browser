import convict from 'convict'

const config = convict({
  NODE_ENV: {
    doc: 'The applicaton environment.',
    format: [
      'production',
      'development',
      'staging',
      'test'
    ],
    default: 'development',
    env: 'NODE_ENV'
  },
  MARVEL_PUBLIC_KEY: {
    doc: 'The Marvel public key to use for Marvel API requests',
    format: String,
    default: null,
    env: 'MARVEL_PUBLIC_KEY'
  },
  MARVEL_PRIVATE_KEY: {
    doc: 'The Marvel API private key to use for Marvel API requests',
    format: String,
    default: null,
    env: 'MARVEL_PRIVATE_KEY'
  },
  PORT: {
    doc: 'The port to bind',
    format: Number,
    default: null,
    env: 'PORT'
  },
  HOST: {
    doc: 'The host to bind',
    format: String,
    default: 'localhost',
    env: 'HOST'
  }
})

config.validate()

export { config }
