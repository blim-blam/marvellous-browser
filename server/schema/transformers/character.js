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
    (rawCharacterArg) => R.assoc('comicsTotal', R.pathOr(0, ['comics', 'available'], rawCharacterArg), rawCharacterArg),
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

