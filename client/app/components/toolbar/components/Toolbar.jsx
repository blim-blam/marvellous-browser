import React from 'react'
import './Toolbar.pcss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import { changeComicsSortOrder, loadMoreComics } from '../../comics/actions'
import { toggleToolbar } from '../actions'
import classNames from 'classnames'

function ComicControls (props) {
  const {
    comics,
    dispatch
  } = props

  return (
    <div className="toolbar__controls">
      <radiogroup>
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
          Onsale Date
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
      </radiogroup>

      <button onClick={() => props.dispatch(loadMoreComics())}>
        More Comics
      </button>
    </div>
  )
}

class Toolbar extends React.Component {
  render () {
    const {
      toolbar: {
        show
      }
    } = this.props

    const toolbarClass = classNames({
      toolbar: true,
      'toolbar--active': show
    })

    const toolbarToggleClass = classNames({
      'toolbar__toggle': true,
      'toolbar__toggle--is-active': show
    })

    const showComicControls = '/comics' === pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'], this.props)
    return (
      <div className={toolbarClass}>
        <button className={toolbarToggleClass}
                onClick={() => this.props.dispatch(toggleToolbar())}>
          <span>Toggle menu</span>
        </button>
        <h1 className="logo">
          <Link to="/">
            <span className="logo__marvel">Marvellous</span>
            <span className="logo__eighties">Browser</span>
          </Link>
        </h1>
        <div className="toolbar__links">
          <Link to="/comics"
                activeClassName="toolbar__links--active">
            Comics
          </Link>
          <Link to="/creators"
                activeClassName="toolbar__links--active">
            Creators
          </Link>
          <Link to="/characters"
                activeClassName="toolbar__links--active">
            Characters
          </Link>
        </div>

        {showComicControls && <ComicControls {...this.props} />}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    routing: state.routing,
    comics: state.comics,
    toolbar: state.toolbar
  }
}

export default connect(mapStateToProps)(Toolbar)
