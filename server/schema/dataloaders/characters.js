import DataLoader from 'dataloader'
import { marvel } from '../../marvel'
import R from 'ramda'
import {transformCharacter} from '../transformers/character'

const getData = R.propOr({}, 'data')

export const charactersLoader = new DataLoader((keySets) => {
  return Promise.all(R.map((keys) => {
    try {
      return marvel.query('characters', JSON.parse(keys))
        .then((response) => R.map(transformCharacter, getData(response)))
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to fetch chracters with query ${JSON.stringify(keys, null, 2)}`)
    }
  }, keySets))
})
