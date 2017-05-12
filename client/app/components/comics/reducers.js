import propOr from 'ramda/src/propOr'
import {
  COMICS_CHANGE_QUERY,
  COMICS_CHANGE_SORT_ORDER_SUCCESS,
  COMICS_LOAD_MORE_SUCCESS,
  COMICS_LOAD_SUCCESS,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_UPDATE_TITLE_STARTS_WITH
} from './constants'

const initialState = {
  data: [],
  orderBy: COMICS_ORDER_ISSUE_NUMBER_DESC
}

export function comics (
  state = initialState,
  action
) {
  switch (action.type) {

    case COMICS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        data: action.data
      })

    case COMICS_LOAD_MORE_SUCCESS:
      return Object.assign({}, state, {
        data: [...state.data, ...action.data]
      })

    case COMICS_CHANGE_QUERY: {
      return Object.assign({}, state, {
        orderBy: propOr(state.orderBy, 'orderBy', action.variables),
        titleStartsWith: propOr(state.titleStartsWith, 'titleStartsWith', action.variables)
      })
    }

    case COMICS_UPDATE_TITLE_STARTS_WITH: {
      return Object.assign({}, state, {
        titleStartsWith: action.titleStartsWith
      })
    }

    case COMICS_CHANGE_SORT_ORDER_SUCCESS:
      return Object.assign({}, state, {
        data: action.data
      })

    default:
      return state
  }
}
