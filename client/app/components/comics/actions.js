/**
 * Convenience function for triggering an action after a graphql query is completed
 *
 * @TODO Error handling
 */
import {
  COMICS_CHANGE_QUERY,
  COMICS_LOAD,
  COMICS_LOAD_MORE,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_SEARCH_ADD_CHARACTER_SUGGESTION,
  COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION,
  COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS,
  COMICS_UPDATE_TITLE_STARTS_WITH
} from './constants'
import {client} from '../../client'
import {gql} from 'react-apollo'
import merge from 'ramda/src/merge'
import remove from 'ramda/src/remove'
import reduce from 'ramda/src/reduce'
import map from 'ramda/src/map'
import head from 'ramda/src/head'
import toPairs from 'ramda/src/toPairs'
import compose from 'ramda/src/compose'
import last from 'ramda/src/last'
import isNil from 'ramda/src/isNil'
import evolve from 'ramda/src/evolve'
import {browserHistory} from 'react-router'

const objectToQueryParams = compose(reduce((
  params,
  pair
) => {
  if (isNil(last(pair))) {
    return params
  }

  const paramsPair = `${head(pair)}=${encodeURIComponent(last(pair))}`
  if (!params) {
    return paramsPair
  }
  return `${params}&${paramsPair}`
}, ''), toPairs)

const cleanComicsVariables = evolve({
  characterIds: map((characterId) => characterId.id)
})

const mergeQueryVariables = compose(cleanComicsVariables, merge({
  start: 0,
  limit: 12,
  titleStartsWith: null,
  characterIds: null,
  orderBy: COMICS_ORDER_ISSUE_NUMBER_DESC
}))

const COMICS_QUERY = gql`query (
    $start: Int,
    $limit: Int,
    $orderBy: String,
    $titleStartsWith: String,
    $characterIds: [Int]
  ) {
    comics(
      start: $start,
      limit: $limit,
      orderBy: $orderBy,
      titleStartsWith: $titleStartsWith,
      characterIds: $characterIds
    ) {
      id
      title
      thumbnail
      hasImages
    }
  }
`

export function loadComics(queryOptions = {}) {
  return {
    type: COMICS_LOAD,
    payload: client.query({
      query: COMICS_QUERY,
      variables: cleanComicsVariables(queryOptions)
    })
  }
}

export function loadMoreComics(query) {
  return {
    type: COMICS_LOAD_MORE,
    payload: client.query({
      query: COMICS_QUERY,
      variables: query
    })
  }
}

export function updateTitleStartsWith(titleStartsWith) {
  return {
    type: COMICS_UPDATE_TITLE_STARTS_WITH,
    titleStartsWith
  }
}

export function updateComicsQuery(variables) {
  const mergedVariables = mergeQueryVariables(variables)

  browserHistory.push(`/comics?${objectToQueryParams(mergedVariables)}`)

  return [
    {
      type: COMICS_CHANGE_QUERY,
      variables
    },
    {
      type: COMICS_LOAD,
      payload: client.query({
        query: COMICS_QUERY,
        variables: mergedVariables
      })
    }
  ]
}

export function deleteComicSearchCharacterSuggestion(index, variables) {
  const mergedVariables = mergeQueryVariables(variables)
  mergedVariables.characterIds = remove(index, 1, variables.characterIds)

  browserHistory.push(`/comics?${objectToQueryParams(mergedVariables)}`)

  return [
    {
      type: COMICS_CHANGE_QUERY,
      variables: {
        characterIds: mergedVariables.characterIds
      }
    },
    {
      type: COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION,
      index
    },
    {
      type: COMICS_LOAD,
      payload: client.query({
        query: COMICS_QUERY,
        variables: mergedVariables
      })
    }
  ]
}

export function addComicSearchCharacterSuggestion(suggestion) {
  return {
    type: COMICS_SEARCH_ADD_CHARACTER_SUGGESTION,
    suggestion
  }
}

const CHARACTER_SUGGESTIONS_QUERY = gql`query (
    $nameStartsWith: String
  ) {
    characters(
      nameStartsWith: $nameStartsWith
    ) {
      id
      name
    }
  }
`

export function fetchComicSearchCharacterSuggestions(nameStartsWith) {
  return {
    type: COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS,
    payload: client.query({
      query: CHARACTER_SUGGESTIONS_QUERY,
      variables: {
        nameStartsWith
      }
    })
  }
}
