import { comicLoader } from './dataloaders/comic'
import { comicsLoader } from './dataloaders/comics'

export const resolvers = {
  Query: {
    async comic(
      obj,
      {id}
    ) {
      return comicLoader.load(id)
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
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }
      return comicsLoader.load(JSON.stringify(keys))
    }
  }
}
