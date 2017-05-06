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
    <div className="comic__characters">
      <h2>Characters</h2>
      <div className="comic__characters__wrapper">
        {props.characters.map((character) => {
          return (
            <div key={character.id}
                 className="comic__characters__wrapper__character">
              <h3 >
                {character.name} {character.role && `(${character.role})`}
              </h3>
              <img src={character.thumbnail}/>
              {character.description && <p>{character.description}</p>}
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

    // Ideally all responsive transformations would be implemented with CSS
    // I do not wish to spend too long on this aspect, although I would require it
    // to be done or at least discussed in a real-world project
    return (
      <div>
        <div className="comic comic--phone">
          <h1 className="comic__title">{comic.title}</h1>
          <div className="comic__hero">
            <img src={head(comic.images)}/>
          </div>
          <p className="comic__description">{comic.description}</p>
          <Characters characters={comic.characters}/>
        </div>

        <div className="comic comic__portrait-tablet">
          <div className="comic__portrait-tablet__wrapper">
            <div className="comic__hero">
              <img src={head(comic.images)}/>
            </div>
            <div className="comic__portrait-tablet__information">
              <h1 className="comic__title">{comic.title}</h1>
              <p className="comic__description">{comic.description}</p>
            </div>
          </div>
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
