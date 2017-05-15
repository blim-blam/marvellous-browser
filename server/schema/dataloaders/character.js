import DataLoader from 'dataloader'
import {marvel} from '../../marvel'
import R from 'ramda'
import {transformCharacter} from '../transformers/character'

const getData = R.pathOr({}, ['data', 0])

export const characterLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformCharacter(getData(await marvel.characters.find(id)))
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch character with id ${id}`)
    }
  }, ids))
})

