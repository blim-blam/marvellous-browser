import React from 'react'
import './Toolbar.pcss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import { toggleToolbar } from '../actions'
import classNames from 'classnames'
import { ComicControls } from './ComicControls'
import { ComicDetailBack } from './ComicDetailBack'

const getPathname = pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'])

class Toolbar extends React.Component {

  render () {
    const {
      dispatch,
      comics,
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

    const pathname = getPathname(this.props)

    // Show Comics load more / other controls iff on the /comics page
    const showComicControls = '/comics' === pathname

    // Show the back button iff on a Comic detail page
    const showComicDetailsBackButton = /\/comics\/\d+/.test(pathname)

    return (
      <div className={toolbarClass}>
        <button className={toolbarToggleClass}
                onClick={() => dispatch(toggleToolbar())}>
          <span>Toggle menu</span>
        </button>

        <h1 className="logo">
          <Link to="/"
                onClick={() => dispatch(toggleToolbar())}>
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
                className="toolbar__links__disabled"
                activeClassName="toolbar__links--active">
            Creators
          </Link>
          <Link to="/characters"
                className="toolbar__links__disabled"
                activeClassName="toolbar__links--active">
            Characters
          </Link>
        </div>

        {showComicControls && <ComicControls comics={comics}
                                             dispatch={dispatch}/>}
        {showComicDetailsBackButton && <ComicDetailBack/>}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    routing: state.routing,
    comics: state.comics,
    toolbar: state.toolbar
  }
})(Toolbar)
