import React from 'react'
import './App.pcss'
import Toolbar from './Toolbar.jsx'
import Comics from './comics/Comics.jsx'

export default class App extends React.Component {

  render () {
    return (
      <div className="marvellous">
          <Comics/>
          <Toolbar/>
      </div>
    )
  }
}
