import React from 'react'
import { gql, graphql } from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import './Comic.pcss'
import head from 'ramda/src/head'
import length from 'ramda/src/length'
import compose from 'ramda/src/compose'
import propOr from 'ramda/src/propOr'

const getComic = pathOr(false, ['data', 'comic'])
const hasCharacters = compose(length, propOr([], 'characters'))

function Characters (props) {
  if (!hasCharacters(props)) {
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
    const comic = getComic(this.props)
    if (!comic) {
      return null
    }

    /**
     * I've gone with the least development time approach here
     *
     * @TODO In a project situation the cost / benefit of duplicating HTML to achieve responsiveness would be discussed with the team.
     */
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

const COMIC_QUERY = gql`query ($id: Int!) {
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
}`

const Comic = graphql(COMIC_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(ComicRenderer)

export default Comic
