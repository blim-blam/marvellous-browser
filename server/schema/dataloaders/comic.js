import {marvel} from '../../marvel'
import DataLoader from 'dataloader'
import {transformComic} from '../transformers/comic'
import R from 'ramda'

const getData = R.pathOr({}, ['data', 0])
export const comicLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformComic(getData(await marvel.comics.find(id)))
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
})
