import React from 'react'
import classNames from 'classnames'
import './ComicSearch.pcss'
import {updateComicsQuery, updateTitleStartsWith} from '../../comics/actions'

export function ComicSearch(props) {
  const {
    dispatch,
    showSearch,
    comics: {
      orderBy,
      titleStartsWith
    }
  } = this.props

  const searchClass = classNames({
    'comic__search': true,
    'comic__search--show': showSearch
  })

  return (
    <div className={searchClass}>
      <form onSubmit={(event) => {
        event.preventDefault()
        dispatch(updateComicsQuery({
          titleStartsWith,
          orderBy
        }))
      }}>
        <input onChange={(event) => dispatch(updateTitleStartsWith(event.target.value))}
               value={titleStartsWith || ''}
               placeholder="Search titles that start with"
               className="comic__search__input"/>
        <button className="comic__search__button">
          Go
        </button>
      </form>
    </div>
  )
}
