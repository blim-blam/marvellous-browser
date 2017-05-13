import React from 'react'
import './Toolbar.pcss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import { toggleToolbar } from '../actions'
import classNames from 'classnames'
import { ComicControls } from './ComicControls'
import { ComicDetailBack } from './ComicDetailBack'
import { ComicSearch } from './ComicSearch'

const getPathname = pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'])

class Toolbar extends React.Component {

  render () {
    const {
      dispatch,
      comics,
      toolbar: {
        show,
        showSearch
      }
    } = this.props

    const pathname = getPathname(this.props)

    // Show Comics load more / other controls iff on the /comics page
    const showComicControls = '/comics' === pathname

    const toolbarClass = classNames({
      toolbar: true,
      'toolbar--active': show,
      'toolbar--active-search': show && showSearch && showComicControls
    })

    const toolbarToggleClass = classNames({
      'toolbar__toggle': true,
      'toolbar__toggle--is-active': show
    })

    const toolbarBottomClass = classNames({
      'toolbar__bottom': true,
      'toolbar__bottom--is-active': show && showSearch && showComicControls
    })

    // Show the back button iff on a Comic detail page
    const showComicDetailsBackButton = /\/comics\/\d+/.test(pathname)

    return (
      <div className={toolbarClass}>
        <div className="toolbar__top">
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

          <div className="toolbar__top__links">
            <Link to="/comics"
                  activeClassName="toolbar__top__links--active">
              Comics
            </Link>
            <Link to="/creators"
                  className="toolbar__top__links__disabled"
                  activeClassName="toolbar__top__links--active">
              Creators
            </Link>
            <Link to="/characters"
                  className="toolbar__top__links__disabled"
                  activeClassName="toolbar__top__links--active">
              Characters
            </Link>
          </div>

          {showComicControls && <ComicControls comics={comics}
                                               dispatch={dispatch}/>}
          {showComicDetailsBackButton && <ComicDetailBack/>}
        </div>
        <div className={toolbarBottomClass}>
          {this.showComicSearch(dispatch, comics, showSearch, showComicControls)}
        </div>
      </div>
    )
  }

  showComicSearch (
    dispatch,
    comics,
    showSearch,
    showComicControls
  ) {

    return (
      <ComicSearch comics={comics}
                   showSearch={showSearch && showComicControls}
                   dispatch={dispatch}/>
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
