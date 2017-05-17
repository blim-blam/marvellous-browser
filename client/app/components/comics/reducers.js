import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'
import split from 'ramda/src/split'
import defaultTo from 'ramda/src/defaultTo'
import compose from 'ramda/src/compose'
import remove from 'ramda/src/remove'
import map from 'ramda/src/map'
import URLSearchParams from 'url-search-params'
import {
  COMICS_CHANGE_QUERY,
  COMICS_LOAD_FULFILLED,
  COMICS_LOAD_MORE_FULFILLED,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_SEARCH_ADD_CHARACTER_SUGGESTION,
  COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION,
  COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS_FULFILLED,
  COMICS_UPDATE_TITLE_STARTS_WITH
} from './constants'

const getCharacterIdsFromParams = (params) => {
  if (!params.characterIds) {
    return []
  }
  return compose(map((id) => ({ id, name: id })), split(','), defaultTo(''))(params.get('characterIds'))(params)
}

// eslint-disable-next-line no-undef
const params = new URLSearchParams(location.search.slice(1));
const initialState = {
  data: [],
  orderBy: params.get('orderBy') || COMICS_ORDER_ISSUE_NUMBER_DESC,
  titleStartsWith: params.get('titleStartsWith') || '',
  characterIds: getCharacterIdsFromParams(params),
  characterSuggestions: [],
  limit: params.get('limit') || 12,
  start: params.get('start') || 0
}

const getComicsFromResponse = pathOr([], ['payload', 'data', 'comics'])

export function comics (
  state = initialState,
  action
) {
  switch (action.type) {

    case COMICS_LOAD_FULFILLED:
      return Object.assign({}, state, {
        data: getComicsFromResponse(action)
      })

    case COMICS_LOAD_MORE_FULFILLED:
      return Object.assign({}, state, {
        data: [...state.data, ...getComicsFromResponse(action)]
      })

    case COMICS_CHANGE_QUERY: {
      return Object.assign({}, state, {
        orderBy: propOr(state.orderBy, 'orderBy', action.variables),
        titleStartsWith: propOr(state.titleStartsWith, 'titleStartsWith', action.variables),
        characterIds: propOr(state.characterIds, 'characterIds', action.variables)
      })
    }

    case COMICS_UPDATE_TITLE_STARTS_WITH: {
      return Object.assign({}, state, {
        titleStartsWith: action.titleStartsWith
      })
    }

    case COMICS_SEARCH_ADD_CHARACTER_SUGGESTION: {
      return Object.assign({}, state, {
        characterIds: [...state.characterIds, ...[action.suggestion]]
      })
    }

    case COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION: {
      return Object.assign({}, state, {
        characterIds: remove(action.index, 1, state.characterIds)
      })
    }

    case COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS_FULFILLED: {
      return Object.assign({}, state, {
        characterSuggestions: action.payload.data.characters
      })
    }

    default:
      return state
  }
}
