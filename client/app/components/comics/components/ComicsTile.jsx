import React from 'react'
import './ComicsTile.pcss'
import randomColor from 'randomcolor'
import { Link } from 'react-router'
import classNames from 'classnames'

export default class ComicTile extends React.Component {

  style (comic) {
    if (comic.hasImages) {
      return {
        backgroundImage: `url(${comic.thumbnail})`
      }
    }

    return {
      backgroundColor: randomColor()
    }
  }

  render () {
    const comic = this.props.comic

    const comicClass = classNames({
      'comic-tile': true,
      'comic-tile--no-images': !comic.hasImages
    })

    return (
      <Link to={`/comics/${comic.id}`}
            className={comicClass}
            style={this.style(comic)}>
        {comic.hasImages && <img src={comic.thumbnail}/>}
        <div className="comic-tile__detail">
          <h3>{comic.title}</h3>
        </div>
      </Link>
    )
  }
}

