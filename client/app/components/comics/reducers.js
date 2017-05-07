import {
  COMICS_CHANGE_SORT_ORDER,
  COMICS_CHANGE_SORT_ORDER_SUCCESS,
  COMICS_LOAD_MORE_SUCCESS,
  COMICS_LOAD_SUCCESS,
  COMICS_ORDER_ISSUE_NUMBER_DESC
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

    case COMICS_CHANGE_SORT_ORDER: {
      return Object.assign({}, state, {
        orderBy: action.orderBy
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
