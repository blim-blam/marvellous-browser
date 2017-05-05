import { COMICS_LOAD_MORE, COMICS_LOADED_MORE } from './constants'

const initialState = {
  loadMore: false
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
    default:
      return state
  }
}
