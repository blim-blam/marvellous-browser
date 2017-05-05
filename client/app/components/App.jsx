import React from 'react'
import './App.pcss'
import Toolbar from './Toolbar.jsx'
import Comics from './comics/Comics.jsx'
import LoadingBar from 'react-redux-loading-bar'

export default class App extends React.Component {

  render () {
    return (
      <div className="marvellous">
        <Comics start="0"
                limit="30"/>
        <Toolbar/>
        <LoadingBar className="loading" />
      </div>
    )
  }
}
