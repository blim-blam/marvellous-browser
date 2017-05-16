import React from 'react'
import classNames from 'classnames'
import './ComicSearch.pcss'
import {
  addComicSearchCharacterSuggestion, deleteComicSearchCharacterSuggestion, fetchComicSearchCharacterSuggestions,
  updateComicsQuery,
  updateTitleStartsWith
} from '../../comics/actions'
import ReactTags from 'react-tag-autocomplete'

export function ComicSearch(props) {
  const {
    dispatch,
    showSearch,
    comics: {
      orderBy,
      titleStartsWith,
      characterSuggestions,
      characterIds
    }
  } = props

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
          orderBy,
          characterIds
        }))
      }}>
        <div className="comic__search__inputs">
          <ReactTags placeholder="Including which character"
                     tags={characterIds}
                     suggestions={characterSuggestions}
                     handleDelete={(index) => dispatch(deleteComicSearchCharacterSuggestion(index, {characterIds}))}
                     handleAddition={(tag) => dispatch(addComicSearchCharacterSuggestion(tag, {characterIds}))}
                     handleInputChange={(input) => dispatch(fetchComicSearchCharacterSuggestions(input))}
                     className="comic__search__inputs__input"
          />
          <input onChange={(event) => dispatch(updateTitleStartsWith(event.target.value))}
                 value={titleStartsWith || ''}
                 placeholder="Titles that start with"
                 className="comic__search__inputs__input"/>
        </div>
        <button className="comic__search__button">
          Go
        </button>
      </form>
    </div>
  )
}
