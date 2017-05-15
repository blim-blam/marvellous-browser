import React from 'react'
import {gql, graphql} from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import './Character.pcss'
import length from 'ramda/src/length'
import compose from 'ramda/src/compose'
import propOr from 'ramda/src/propOr'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router'
import {updateComicsQuery} from '../../../comics/actions'
import {connect} from 'react-redux'

const getCharacter = pathOr(false, ['data', 'character'])
const hasComics = compose(length, propOr([], 'comics'))

function MoreComics(props) {
  const {
    character,
    dispatch,
    hasMoreComics
  } = props

  if (!hasMoreComics) {
    return null
  }

  return (
    <button onClick={() => dispatch(updateComicsQuery({
      characterIds: character.id
    }))}
            className="character__comics__view-more">
      More {character.name}
    </button>
  )
}

function Comics(props) {
  const {
    character,
    dispatch
  } = props

  if (!hasComics(character)) {
    return null
  }

  const comics = character.comics
  const hasMoreComics = character.comicsTotal > comics.length

  return (
    <div className="character__comics">
      <h2>Characters</h2>
      <div className="character__comics__wrapper">
        {comics.map((comic) => {
          return (
            <Link key={comic.id}
                  to={`/comics/${comic.id}`}
                  className="character__comics__wrapper__comic">
              <h3>{comic.title}</h3>
              <img src={comic.thumbnail}/>
              {comic.description && <p dangerouslySetInnerHTML={{__html: comic.description}}/>}
            </Link>
          )
        })}
      </div>
      <MoreComics hasMoreComics={hasMoreComics}
                  character={character}
                  dispatch={dispatch}/>
    </div>
  )
}

function CharacterRenderer(props) {
  const character = getCharacter(props)
  if (!character) {
    return null
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`${character.name} | Characters | Marvellous`}</title>
        <meta property="og:title"
              content={character.name}/>
        <meta property="og:type"
              content="profile"/>
        <meta property="og:url"
              content={window.location.href}/>
        <meta property="og:image"
              content={character.thumbnail}/>
        <meta property="og:description"
              content={character.description}/>
      </Helmet>

      <div className="character character--phone">
        <h1 className="character__namer">{character.name}</h1>
        <div className="character__hero">
          <img src={character.thumbnail}/>
        </div>
        <p className="character__description"
           dangerouslySetInnerHTML={{__html: character.description}}/>
        <Comics character={character}
                dispatch={props.dispatch}/>
      </div>

      <div className="comic character__portrait-tablet">
        <div className="character__portrait-tablet__wrapper">
          <div className="character__hero">
            <img src={character.thumbnail}/>
          </div>
          <div className="character__portrait-tablet__information">
            <h1 className="character__name">{character.name}</h1>
            <p className="character__description"
               dangerouslySetInnerHTML={{__html: character.description}}/>
          </div>
        </div>
        <Comics character={character}
                dispatch={props.dispatch}/>
      </div>
    </div>
  )
}

const CHARACTER_QUERY = gql`query ($id: Int!) {
  character(id: $id){
    id
    name
    thumbnail
    description
    comicsTotal
    comics {
      id
      description
      title
      thumbnail
    }
  }
}`

const Character = graphql(CHARACTER_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(CharacterRenderer)

export default connect(() => {
  return {}
})(Character)
