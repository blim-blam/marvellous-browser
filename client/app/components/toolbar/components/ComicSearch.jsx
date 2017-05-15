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
          <input onChange={(event) => dispatch(updateTitleStartsWith(event.target.value))}
                 value={titleStartsWith || ''}
                 placeholder="Titles that start with"
                 className="comic__search__inputs__input"/>
          <ReactTags placeholder="Including which character"
                     tags={characterIds}
                     suggestions={characterSuggestions}
                     handleDelete={(index) => dispatch(deleteComicSearchCharacterSuggestion(index, {
                       orderBy,
                       titleStartsWith,
                       characterIds
                     }))}
                     handleAddition={(tag) => dispatch(addComicSearchCharacterSuggestion(tag))}
                     handleInputChange={(input) => dispatch(fetchComicSearchCharacterSuggestions(input))}
                     className="comic__search__inputs__input"
          />
        </div>
        <button className="comic__search__button">
          Go
        </button>
      </form>
    </div>
  )
}
