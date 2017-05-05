import { marvel } from '../marvel'
import R from 'ramda'

const combineImageComponents = (imageComponents) => `${imageComponents.path}.${imageComponents.extension}`

const fetchCharacters = async (characterSummary) => {
  const id = R.compose(R.last, R.split('/'))(characterSummary.resourceURI)
  const characterRawDetail = await marvel.characters.find(id)
  return transformCharacter(R.pathOr({}, ['data', 0], characterRawDetail))
}

const transformCharacter = (rawCharacter) => {
  return R.compose(
    R.evolve({
      thumbnail: combineImageComponents
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

const transformComic = (rawComic) => {

  return R.compose(
    R.assoc('hasImages', Boolean(R.length(rawComic.images))),
    R.evolve({
      thumbnail: combineImageComponents,
      images: R.map(combineImageComponents),
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

export const resolvers = {
  Query: {
    async comic(
      obj,
      {id}
    ) {
      try {
        const response = await marvel.comics.find(id)
        const comic = transformComic(R.pathOr({}, ['data', 0], response))

        const characters = await Promise.all(R.map(fetchCharacters, comic.characters))

        comic.characters = characters

        return comic
      } catch (error) {
        throw new Error(`Failed to fetch comic with id ${id}`)
      }
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
