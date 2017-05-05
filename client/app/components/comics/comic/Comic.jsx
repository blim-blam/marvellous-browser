import React from 'react'
import { gql, graphql } from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import './Comic.pcss'

class ComicRenderer extends React.Component {
  render () {
    const comic = pathOr([], ['data', 'comics'])(this.props)
    console.log(comic)

    return (
      <div className="comic">
      </div>
    )
  }
}

const Comic = graphql(gql`
        query ($id: Int) {
            comic(id:$id){
            id
            title
          }
        }
        `, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(ComicRenderer)

export default Comic
