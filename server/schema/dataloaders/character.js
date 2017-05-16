import DataLoader from 'dataloader'
import {marvel} from '../../marvel'
import R from 'ramda'
import {transformCharacter} from '../transformers/character'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.pathOr({}, ['data', 0])

const characterDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformCharacter(getData(await marvel.characters.find(id)))
    } catch (error) {
      throw new Error(`Failed to fetch character with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const characterLoader = new RedisDataLoaderConstructor('character', characterDataLoader)

