import { marvel } from '../marvel'
import R from 'ramda'

const combineImageComponents = (imageComponents) => `${imageComponents.path}.${imageComponents.extension}`

const transformComic = (rawComic) => {
  return {
    id: rawComic.id,
    title: rawComic.title,
    thumbnail: combineImageComponents(rawComic.thumbnail),
    images: R.map(combineImageComponents, rawComic.images),
    hasImages: Boolean(R.length(rawComic.images))
  }
}

export const resolvers = {
  Query: {
    comic(
      obj,
      {id}
    ) {
      return marvel.comics.find(id)
        .then((response) => transformComic(R.pathOr({}, ['data', 0], response)))
        .catch(() => {
          throw new Error(`Failed to fetch comic with id ${id}`)
        })
    },
    comics(
      obj,
      {
        start,
        limit,
        orderBy = '-issueNumber'
      },
      context,
      info
    ) {
      return marvel.query('comics', {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      })
        .then((response) => R.map(transformComic, R.propOr({}, 'data', response)))
    }
  }
}
