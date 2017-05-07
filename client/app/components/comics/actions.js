import {
  COMICS_CHANGE_SORT_ORDER,
  COMICS_CHANGE_SORT_ORDER_SUCCESS,
  COMICS_LOAD,
  COMICS_LOAD_MORE,
  COMICS_LOAD_MORE_SUCCESS,
  COMICS_LOAD_SUCCESS,
  COMICS_LOADING_STARTED
} from './constants'
import { client } from '../../client'
import { gql } from 'react-apollo'
import pathOr from 'ramda/src/pathOr'

const COMICS_QUERY = gql`query ($start: Int, $limit: Int, $orderBy: String) {
  comics(start:$start, limit:$limit, orderBy:$orderBy){
    id
    title
    thumbnail
    hasImages
  }
}`

const getComicsFromResponse = pathOr([], ['data', 'comics'])

/**
 * Convenience function for triggering an action after a graphql query is completed
 *
 * @TODO Error handling
 */
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

export function loadComics (queryOptions = {}) {
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

export function loadMoreComics (query) {
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

export function changeComicsSortOrder (orderBy) {
  return (dispatch) => {
    return [
      dispatch({
        type: COMICS_CHANGE_SORT_ORDER,
        orderBy
      }),
      {
        type: COMICS_LOAD,
        payload: client.query({
          query: COMICS_QUERY,
          variables: {
            start: 0,
            limit: 12,
            orderBy
          }
        })
          .then(dispatchLoadSuccess(dispatch, COMICS_CHANGE_SORT_ORDER_SUCCESS))
      }
    ]
  }
}
