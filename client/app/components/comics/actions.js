/**
 * Convenience function for triggering an action after a graphql query is completed
 *
 * @TODO Error handling
 */
import {
  COMICS_CHANGE_QUERY,
  COMICS_CHANGE_SORT_ORDER_SUCCESS,
  COMICS_LOAD,
  COMICS_LOAD_MORE,
  COMICS_LOAD_MORE_SUCCESS,
  COMICS_LOAD_SUCCESS,
  COMICS_LOADING_STARTED, COMICS_ORDER_ISSUE_NUMBER_DESC, COMICS_UPDATE_TITLE_STARTS_WITH
} from './constants'
import {client} from '../../client'
import {gql} from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import merge from 'ramda/src/merge'

const COMICS_QUERY = gql`query (
  $start: Int, 
  $limit: Int, 
  $orderBy: String,
  $titleStartsWith: String
) {
  comics(
    start: $start, 
    limit: $limit, 
    orderBy: $orderBy,
    titleStartsWith: $titleStartsWith
  ){
    id
    title
    thumbnail
    hasImages
  }
}`

const getComicsFromResponse = pathOr([], ['data', 'comics'])

const dispatchLoadSuccess = (
  dispatch,
  type
) => {
  return (response) => {
    return dispatch({
      type: type,
      data: getComicsFromResponse(response)
    })
  }
}

export function loadComics(queryOptions = {}) {
  return (dispatch) => {
    return [
      {
        type: COMICS_LOADING_STARTED,
        payload: client.query({
          query: COMICS_QUERY,
          variables: queryOptions
        })
          .then(dispatchLoadSuccess(dispatch, COMICS_LOAD_SUCCESS))
      }
    ]
  }
}

export function loadMoreComics(query) {
  return (dispatch) => {
    return [
      {
        type: COMICS_LOAD_MORE,
        payload: client.query({
          query: COMICS_QUERY,
          variables: query
        })
          .then(dispatchLoadSuccess(dispatch, COMICS_LOAD_MORE_SUCCESS))
      }
    ]
  }
}

export function updateTitleStartsWith(titleStartsWith) {
  return {
    type: COMICS_UPDATE_TITLE_STARTS_WITH,
    titleStartsWith
  }
}

export function updateComicsQuery(variables) {
  return (dispatch) => {
    return [
      dispatch({
        type: COMICS_CHANGE_QUERY,
        variables
      }),
      {
        type: COMICS_LOAD,
        payload: client.query({
          query: COMICS_QUERY,
          variables: merge({
            start: 0,
            limit: 12,
            titleStartsWith: null,
            orderBy: COMICS_ORDER_ISSUE_NUMBER_DESC
          }, variables)
        })
          .then(dispatchLoadSuccess(dispatch, COMICS_CHANGE_SORT_ORDER_SUCCESS))
      }
    ]
  }
}

