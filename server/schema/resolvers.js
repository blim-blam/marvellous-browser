import { marvel } from '../marvel'
import R from 'ramda'

const combineImageComponents = (imageComponents) => `${imageComponents.path}.${imageComponents.extension}`

const transformComic = (rawComic) => {
  return {
    id: rawComic.id,
    title: rawComic.title,
    thumbnail: combineImageComponents(rawComic.thumbnail),
    images: R.map(combineImageComponents, rawComic.images)
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
      {start = 0, limit = 25},
      context,
      info
    ) {
      console.log({
        start, limit
      })
      return marvel.comics.findAll(limit, start)
        .then((response) => R.map(transformComic, R.propOr({}, 'data', response)))
    }
  }
}
