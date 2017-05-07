import { marvel } from '../../marvel'
import DataLoader from 'dataloader'
import { transformComic } from '../transformers/comic'
import R from 'ramda'
import { characterLoader, extractCharacterIdFromURI } from './character'

const getData = R.pathOr({}, ['data', 0])
const getCharacterId = R.compose(
  extractCharacterIdFromURI,
  R.prop('resourceURI')
)

export const comicLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const response = await marvel.comics.find(id)
      const comic = transformComic(getData(response))

      comic.characters = await characterLoader.loadMany(R.map(getCharacterId, comic.characters))

      return comic
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
})
