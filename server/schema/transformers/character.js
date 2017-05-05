import R from 'ramda'
import { transformImage } from './images'

export const transformCharacter = (rawCharacter) => {
  return R.compose(
    R.evolve({
      thumbnail: transformImage
    }),
    R.pick([
      'id',
      'name',
      'role',
      'description',
      'thumbnail',
      'images'
    ])
  )(rawCharacter)
}

