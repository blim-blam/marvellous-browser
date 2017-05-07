import React from 'react'
import './App.pcss'
import { Link } from 'react-router'
import Toolbar from './toolbar/components/Toolbar'
import Progress from 'react-progress-2'
import 'react-progress-2/main.css'

export default class App extends React.Component {

  renderChildren (children) {
    if (!children) {
      return null
    }

    return children
  }

  renderRootContent (children) {
    if (children) {
      return null
    }

    return (
      <div className="home">
        <h1>
          <Link to="/comics">
            Comics
          </Link>
        </h1>
        <h1 className="home__disabled">
          <Link to="/creators">
            Creators
          </Link>
        </h1>
        <h1 className="home__disabled">
          <Link to="/characters">
            Characters
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

        {this.renderChildren(this.props.children)}
        {this.renderRootContent(this.props.children)}
      </div>
    )
  }

}
