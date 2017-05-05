import React from 'react'
import './App.pcss'
import { Link } from 'react-router'
import { LoadingBar } from 'react-redux-loading-bar'
import Toolbar from './Toolbar'

export default class App extends React.Component {

  renderChildren () {
    if (!this.props.children) {
      return null
    }

    return this.props.children
  }

  renderRootContent () {
    if (this.props.children) {
      return null
    }

    return (
      <div className="home">
        <Link to="/comics">
          Comics
        </Link>
        <Link to="/authors">
          Authors
        </Link>
      </div>
    )
  }

  render () {
    return (
      <div className="marvellous">
        <LoadingBar className="loading"/>
        <Toolbar/>

        {this.renderChildren()}
        {this.renderRootContent()}
      </div>
    )
  }

}
