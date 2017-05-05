import { marvel } from '../../marvel'
import DataLoader from 'dataloader'
import { transformComic } from '../transformers/comic'
import R from 'ramda'
import { characterLoader, extractCharacterIdFromURI } from './character'

export const comicLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const response = await marvel.comics.find(id)
      const comic = transformComic(R.pathOr({}, ['data', 0], response))

      comic.characters = await characterLoader.loadMany(R.map(
        R.compose(
          extractCharacterIdFromURI,
          R.prop('resourceURI')),
        comic.characters
      ))

      return comic
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch comic with id ${id}`)
    }
  }, ids))
})
