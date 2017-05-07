import { comicLoader } from './dataloaders/comic'
import { comicsLoader } from './dataloaders/comics'
import { COMICS_ORDER_ISSUE_NUMBER_DESC } from '../constants'

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
        orderBy = COMICS_ORDER_ISSUE_NUMBER_DESC
      }
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
