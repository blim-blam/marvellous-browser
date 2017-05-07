import DataLoader from 'dataloader'
import { marvel } from '../../marvel'
import R from 'ramda'
import { transformCharacter } from '../transformers/character'

export const extractCharacterIdFromURI = R.compose(R.last, R.split('/'))
const getData = R.pathOr({}, ['data', 0])

export const characterLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const characterRawDetail = await marvel.characters.find(id)
      return transformCharacter(getData(characterRawDetail))
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch character with id ${id}`)
    }
  }, ids))
})

