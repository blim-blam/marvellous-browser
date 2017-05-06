import React from 'react'
import './ComicControls.pcss'
import { changeComicsSortOrder, loadMoreComics } from '../../comics/actions'

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
                 checked={comics.orderBy === 'title'}
                 onChange={() => dispatch(changeComicsSortOrder('title'))}
                 value="title"
          />
        </label>
        <label>
          Sale Date
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === '-onsaleDate'}
                 onChange={() => dispatch(changeComicsSortOrder('-onsaleDate'))}
                 value="-onsaleDate"
          />
        </label>
        <label>
          Issue Number
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === '-issueNumber'}
                 onChange={() => dispatch(changeComicsSortOrder('-issueNumber'))}
                 value="-issueNumber"
          />
        </label>
      </div>

      <button onClick={() => props.dispatch(loadMoreComics())}>
        More Comics
      </button>
    </div>
  )
}
