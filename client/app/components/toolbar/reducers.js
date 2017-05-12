import {TOOLBAR_SEARCH_TOGGLE, TOOLBAR_TOGGLE} from './constants'

const initialState = {
  show: false,
  showSearch: false
}

export function toolbar (
  state = initialState,
  action
) {
  switch (action.type) {
    case TOOLBAR_TOGGLE:
      return Object.assign({}, state, {
        show: !state.show
      })

    case TOOLBAR_SEARCH_TOGGLE: {
      return Object.assign({}, state, {
        showSearch: !state.showSearch
      })
    }

    default:
      return state
  }
}
