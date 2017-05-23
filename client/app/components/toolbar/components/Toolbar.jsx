import React from 'react'
import './Toolbar.pcss'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import any from 'ramda/src/any'
import {toggleToolbar} from '../actions'
import classNames from 'classnames'
import {ComicControls} from './ComicControls'
import {CreatorControls} from './CreatorSearch/CreatorControls'
import {CreatorSearch} from './CreatorSearch/CreatorSearch'
import {DetailBack} from './DetailBack'
import {ComicSearch} from './ComicSearch'

const getPathname = pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'])
const isOnDetailsPage = () => {
  return any((path) => {
    return (new RegExp(`^${path}/\\d+`)).test(window.location.pathname)
  }, ['/comics', '/characters'])
}

function Toolbar(props) {
  const {
    dispatch,
    comics,
    creators,
    toolbar: {
      show,
      showSearch
    }
  } = props

  const pathname = getPathname(props)

  // Show Comics load more / other controls iff on the /comics page
  const showComicControls = '/comics' === pathname
  const showCreatorControls = '/creators' === pathname
  const toolbarClass = classNames({
    toolbar: true,
    'toolbar--active': show,
    'toolbar--active-search': show && showSearch && (showComicControls || showCreatorControls)
  })

  const toolbarToggleClass = classNames({
    'toolbar__toggle': true,
    'toolbar__toggle--is-active': show
  })

  const toolbarBottomClass = classNames({
    'toolbar__bottom': true,
    'toolbar__bottom--is-active': show && showSearch && (showComicControls || showCreatorControls)
  })

  // Show the back button iff on a detail page
  const showDetailsBackButton = isOnDetailsPage()

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
        {showCreatorControls && <CreatorControls creators={creators}
                                             dispatch={dispatch}/>}
        {showDetailsBackButton && <DetailBack/>}
      </div>
      <div className={toolbarBottomClass}>
        {showComicControls && <ComicSearch comics={comics}
                                           dispatch={dispatch}
                                           showSearch={showSearch && showComicControls}/>
        }
        {showCreatorControls && <CreatorSearch creators={creators}
                                               dispatch={dispatch}
                                               showSearch={showSearch && showCreatorControls}/>
        }
      </div>
    </div>
  )
}

export default connect((state) => {
  return {
    routing: state.routing,
    comics: state.comics,
    creators: state.creators,
    toolbar: state.toolbar
  }
})(Toolbar)
