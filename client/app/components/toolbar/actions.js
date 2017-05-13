import { TOOLBAR_SEARCH_TOGGLE, TOOLBAR_TOGGLE } from './constants'

export function toggleToolbar () {
  return {
    type: TOOLBAR_TOGGLE
  }
}

export function toggleToolbarSearch () {
  return {
    type: TOOLBAR_SEARCH_TOGGLE
  }
}


