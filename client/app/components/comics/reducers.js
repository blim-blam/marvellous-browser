import { COMICS_CHANGE_SORT_ORDER, COMICS_LOAD_MORE, COMICS_LOADED_MORE } from './constants'

const initialState = {
  loadMore: false,
  orderBy: '-issueNumber'
}

export function comics (
  state = initialState,
  action
) {
  switch (action.type) {
    case COMICS_LOAD_MORE:
      return Object.assign({}, state, {
        loadMore: true
      })

    case COMICS_LOADED_MORE:
      return Object.assign({}, state, {
        loadMore: false
      })

    case COMICS_CHANGE_SORT_ORDER:
      return Object.assign({}, state, {
        orderBy: action.newOrder
      })

    default:
      return state
  }
}
