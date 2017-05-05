import React from 'react'
import { gql, graphql } from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import './Comic.pcss'
import head from 'ramda/src/head'
import length from 'ramda/src/length'

function Characters (props) {
  if (!length(props.characters)) {
    return null
  }

  return (
    <div>
      <h2>Characters</h2>
      <div className="comic__characters">
        {props.characters.map((character) => {
          return (
            <div key={character.id}
                 className="comic__characters__character">
              <h3 >
                {character.name} {character.role && `(${character.role})`}
              </h3>
              {character.description && <p>{character.description}</p>}
              <img src={character.thumbnail}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

class ComicRenderer extends React.Component {
  render () {
    const comic = pathOr(false, ['data', 'comic'])(this.props)

    if (!comic) {
      return null
    }

    return (
      <div className="comic">
        <img className="comic__hero"
             src={head(comic.images)}/>
        <div className="comic__body">
          <h1>{comic.title}</h1>
          <p>{comic.description}</p>

          <Characters characters={comic.characters}/>
        </div>
      </div>
    )
  }
}

const Comic = graphql(gql`
      query ($id: Int!) {
      comic(id:$id){
      id
      title
      images
      description
      characters {
      id
      description
      name
      role
      thumbnail
    }
    }
    }
      `, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(ComicRenderer)

export default Comic
