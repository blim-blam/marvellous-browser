import React from 'react'
import './ComicControls.pcss'
import { changeComicsSortOrder, loadMoreComics } from '../../comics/actions'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import {
  COMICS_LOAD_MORE_LIMIT,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_ORDER_ON_SALE_DATE_DESC,
  COMICS_ORDER_TITLE_ASC
} from '../../comics/constants'

const getNumberOfComics = pathOr(0, ['comics', 'data', 'length'])
const getOrderBy = path(['comics', 'orderBy'])

const getLoadMoreComicsQueryOptions = (props) => {
  return {
    start: getNumberOfComics(props),
    limit: COMICS_LOAD_MORE_LIMIT,
    orderBy: getOrderBy(props)
  }
}

export function ComicControls (props) {
  const {
    comics,
    dispatch
  } = props

  return (
    <div className="comic__controls">
      <div className="comic__controls__sorting">
        <label>
          Title
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_TITLE_ASC}
                 onChange={() => dispatch(changeComicsSortOrder(COMICS_ORDER_TITLE_ASC))}
          />
        </label>
        <label>
          Sale Date
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_ON_SALE_DATE_DESC}
                 onChange={() => dispatch(changeComicsSortOrder(COMICS_ORDER_ON_SALE_DATE_DESC))}
          />
        </label>
        <label>
          Issue Number
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_ISSUE_NUMBER_DESC}
                 onChange={() => dispatch(changeComicsSortOrder(COMICS_ORDER_ISSUE_NUMBER_DESC))}
          />
        </label>
      </div>

      <button onClick={() => props.dispatch(loadMoreComics(getLoadMoreComicsQueryOptions(props)))}>
        More Comics
      </button>
    </div>
  )
}
