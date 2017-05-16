import R from 'ramda'
import {transformImage} from './images'
import {cleanString} from '../../helpers/clean-string'

export const transformCharacter = (rawCharacter) => {
  return R.compose(
    R.evolve({
      thumbnail: transformImage,
      comics: R.prop('items'),
      description: cleanString
    }),
    R.converge(
      R.assoc('comicsTotal'),
      [
        R.pathOr(0, ['comics', 'available']),
        R.identity
      ]
    ),
    R.pick([
      'id',
      'name',
      'role',
      'description',
      'thumbnail',
      'images',
      'comics'
    ])
  )(rawCharacter)
}

