import React from 'react'
import './App.pcss'
import { Link } from 'react-router'
import Toolbar from './Toolbar'
import Progress from 'react-progress-2'
import 'react-progress-2/main.css'

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
        <h1>
          <Link to="/comics">
            Comics
          </Link>
        </h1>
        <h1>
          <Link to="/authors">
            Authors
          </Link>
        </h1>
      </div>
    )
  }

  render () {
    return (
      <div className="wrapper">
        <Progress.Component/>
        <Toolbar/>

        {this.renderChildren()}
        {this.renderRootContent()}
      </div>
    )
  }

}
