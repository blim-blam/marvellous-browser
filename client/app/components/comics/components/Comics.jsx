import React from 'react'
import { gql, graphql } from 'react-apollo'
import ComicsTile from './ComicsTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Comics.pcss'
import { connect } from 'react-redux'
import { loadedMoreComics } from '../actions'

class ComicsRenderer extends React.Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.comics.loadMore) {
      this.props.loadMoreComics()
      this.props.dispatch(loadedMoreComics())
    }
  }

  render () {
    const comics = pathOr([], ['data', 'comics'])(this.props)
    const viewingComicId = pathOr(false, ['params', 'id'])(this.props)

    if (viewingComicId) {
      return this.props.children
    }

    return (
      <div className="comics">
        {comics.map((comic) => <ComicsTile key={comic.id}
                                           comic={comic}/>)}
      </div>
    )
  }
}

const COMICS_QUERY = gql`
        query ($start: Int, $limit: Int, $orderBy: String) {
            comics(start:$start, limit:$limit, orderBy:$orderBy){
            id
            title
            thumbnail
            hasImages
          }
        }
        `

const Comics = graphql(COMICS_QUERY, {
  skip: (ownProps) => {
    return pathOr(false, ['params', 'id'])(ownProps)
  },
  options(props) {
    return {
      variables: {
        start: 0,
        limit: 12,
        orderBy: pathOr('-issueDate', ['comics', 'orderBy'], props)
      },
      fetchPolicy: 'network-only'
    }
  },
  props({
          data,
          ownProps
        }) {
    return {
      data: {
        loading: data.loading,
        comics: data.comics
      },
      loadMoreComics() {
        return data.fetchMore({
          variables: {
            start: data.comics.length,
            limit: 12,
            orderBy: ownProps.comics.orderBy
          },
          updateQuery: (
            previousResult,
            {fetchMoreResult}
          ) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              comics: [
                ...previousResult.comics,
                ...fetchMoreResult.comics
              ]
            })
          }
        })
      }
    }
  }
})(ComicsRenderer)

function mapStateToProps (state) {
  return {comics: state.comics}
}

export default connect(mapStateToProps)(Comics)
