// import Comic from './Comic.jsx'
import React from 'react'
import { graphql, gql } from 'react-apollo'
// import Relay from 'react-relay'
//
class ComicsRenderer extends React.Component {
  render () {
    const comics = this.props.comics
    return (
      <div>
        {/*{
         comics.map((comic) => <Comic comic={comic}/>)
         }*/}
        <button onClick={() => this.loadMore()}>Load More</button>
      </div>
    )
  }

  loadMore () {
    // TODO: fetch more stories
  }
}

// Apollo Client lets you attach GraphQL queries to
// your UI components to easily load data
const Comics = graphql(gql`{
  comics(start: 0, limit: 30){
    id
    title
    thumbnail
  }
}`, {options: {notifyOnNetworkStatusChange: true}})(ComicsRenderer)
//
// export default Relay.createContainer(Comics, {
//   initialVariables: {
//     count: 10
//   },
//   fragments: {
//     comics: () => Relay.QL`
//       fragment on Comics {
//         comics(first: $count) {
//           edges {
//             node {
//               ${Comic.getFragment('comic')} /* compose child fragment */
//             }
//           }
//         }
//       }
//     `
//   }
// })

export default Comics
