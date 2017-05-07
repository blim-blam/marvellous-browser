import { TOOLBAR_TOGGLE } from './constants'

const initialState = {
  show: false
}

export function toolbar (
  state = initialState,
  action
) {
  switch (action.type) {
    case TOOLBAR_TOGGLE:
      return {
        show: !state.show
      }

    default:
      return state
  }
}
