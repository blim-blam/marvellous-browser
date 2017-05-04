import React from 'react'
import './Toolbar.pcss'

export default class Toolbar extends React.Component {
  render () {
    return (
      <div className="toolbar">
        <h1 className="logo">
          <span className="logo__marvel">Marvellous</span>
          <span className="logo__eighties">Browser</span>
        </h1>
      </div>
    )
  }
}