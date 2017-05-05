import React from 'react'
import './Toolbar.pcss'
import { Link } from 'react-router'

export default class Toolbar extends React.Component {
  render () {
    return (
      <div className="toolbar">
        <h1 className="logo">
          <Link to="/">
            <span className="logo__marvel">Marvellous</span>
            <span className="logo__eighties">Browser</span>
          </Link>
        </h1>
      </div>
    )
  }
}