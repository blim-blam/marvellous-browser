import DataLoader from 'dataloader'
import R from 'ramda'
import {characterLoader} from './character'
import {extractIdFromURI} from '../../helpers/extract-id-from-uri'
import {comicLoader} from './comic'

const getCharacterId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

export const comicDetailLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const comic = await comicLoader.load(id)

      comic.characters = await characterLoader.loadMany(R.map(getCharacterId, comic.characters))

      return comic
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
})
