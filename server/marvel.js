import api from '@faceleg/marvel-api'
import { config } from './config'

export const marvel = api.createClient({
  publicKey: config.get('MARVEL_PUBLIC_KEY'),
  privateKey: config.get('MARVEL_PRIVATE_KEY')
})
