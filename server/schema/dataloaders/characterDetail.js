import DataLoader from 'dataloader'
import R from 'ramda'
import {extractIdFromURI} from '../../helpers/extract-id-from-uri'
import {comicLoader} from './comic'
import {characterLoader} from './character'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getComicId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

const characterDetailDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const character = await characterLoader.load(id)

      character.comics = await comicLoader.loadMany(R.map(getComicId, character.comics))

      return character
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch character with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const characterDetailLoader = new RedisDataLoaderConstructor('character-detail', characterDetailDataLoader)
