import React from 'react'
import { gql, graphql } from 'react-apollo'
import ComicTile from './ComicTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Comics.pcss'

class ComicsRenderer extends React.Component {
  render () {
    const comics = pathOr([], ['data', 'comics'])(this.props)

    return (
      <div className="comics">
        {comics.map((comic) => <ComicTile key={comic.id}
                                          comic={comic}/>)}
      </div>
    )
  }
}

const Comics = graphql(gql`
        query ($start: Int, $limit: Int) {
            comics(start:$start, limit:$limit){
            id
            title
            thumbnail
            hasImages
          }
        }
        `, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(ComicsRenderer)

export default Comics
