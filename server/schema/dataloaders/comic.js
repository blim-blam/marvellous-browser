import {marvel} from '../../marvel'
import DataLoader from 'dataloader'
import {transformComic} from '../transformers/comic'
import R from 'ramda'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.pathOr({}, ['data', 0])
const comicDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformComic(getData(await marvel.comics.find(id)))
    } catch (error) {
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const comicLoader = new RedisDataLoaderConstructor('comic', comicDataLoader)
