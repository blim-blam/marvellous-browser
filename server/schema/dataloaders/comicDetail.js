import DataLoader from 'dataloader'
import R from 'ramda'
import {characterLoader} from './character'
import {extractIdFromURI} from '../../helpers/extract-id-from-uri'
import {comicLoader} from './comic'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getCharacterId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

const comicDetailDataLoader = new DataLoader((ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const comic = await comicLoader.load(id)

      comic.characters = await characterLoader.loadMany(R.map(getCharacterId, comic.characters))

      return comic
    } catch (error) {
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const comicDetailLoader = new RedisDataLoaderConstructor('comic-detail', comicDetailDataLoader)
