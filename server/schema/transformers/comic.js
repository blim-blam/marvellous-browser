import R from 'ramda'
import { transformImage } from './images'

export const transformComic = (rawComic) => {
  return R.compose(
    R.assoc('hasImages', Boolean(R.length(rawComic.images))),
    R.evolve({
      thumbnail: transformImage,
      images: R.map(transformImage),
      characters: R.prop('items')
    }),
    R.pick([
      'id',
      'title',
      'thumbnail',
      'images',
      'description',
      'variantDescription',
      'characters'
    ])
  )(rawComic)
}
