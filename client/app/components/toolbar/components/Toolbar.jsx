import React from 'react'
import './Toolbar.pcss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import { toggleToolbar } from '../actions'
import classNames from 'classnames'
import { ComicControls } from './ComicControls'
import { ComicDetailBack } from './ComicDetailBack'

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
    const showComicDetailsBackButton = /\/comics\/\d+/.test(pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'], this.props))
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
        {showComicDetailsBackButton && <ComicDetailBack/>}
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
