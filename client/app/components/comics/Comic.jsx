import React from 'react'
import Relay from 'react-relay'

class Comic extends React.Component {
  render () {
    const comic = this.props.comic
    console.log(comic)
    return (
      <div className="comic">
        {/*<Image uri={story.author.profilePicture.uri} />*/}
        {/*<Text>{story.author.name}</Text>*/}
        {/*<Text>{story.text}</Text>*/}
      </div>
    )
  }
}

export default Relay.createContainer(Comic, {
  fragments: {
    comic: () => Relay.QL`
      fragment on Comic {
        title
        issueNumber
        thumbnail {
          path
          extension
        }
      }
    `
  }
})

