import React from 'react'
import ComicsTile from './ComicsTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Comics.pcss'
import {connect} from 'react-redux'
import {loadComics} from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'

const getComics = pathOr([], ['comics', 'data'])
const viewingComicId = pathOr(false, ['params', 'id'])

export const getComicsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'titleStartsWith'
]), pathOr({}, ['comics']))

class ComicsRenderer extends React.Component {

  componentDidMount() {
    this.props.dispatch(loadComics(getComicsQueryOptions(this.props)))
  }

  render() {
    if (viewingComicId(this.props)) {
      return this.props.children
    }

    const comics = getComics(this.props)
    return (
      <div className="comics">
        {comics.map((comic) => <ComicsTile key={comic.id}
                                           comic={comic}/>)}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    comics: state.comics
  }
})(ComicsRenderer)
