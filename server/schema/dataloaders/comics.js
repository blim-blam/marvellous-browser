import DataLoader from 'dataloader'
import {marvel} from '../../marvel'
import R from 'ramda'
import {transformComic} from '../transformers/comic'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.propOr({}, 'data')

const comicsDataLoader = new DataLoader((keySets) => {
  return Promise.all(R.map((keys) => {
    try {
      return marvel.query('comics', JSON.parse(keys))
        .then((response) => R.map(transformComic, getData(response)))
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to fetch comics with query ${JSON.stringify(keys, null, 2)}`)
    }
  }, keySets))
}, {
  cache: false
})

export const comicsLoader = new RedisDataLoaderConstructor('comics', comicsDataLoader)
