import React from 'react'
import './ComicsTile.pcss'
import randomColor from 'randomcolor'

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

    const classNames = ['comic-tile']
    if (!comic.hasImages) {
      classNames.push('comic-tile--no-images')
    }

    return (
      <div className={classNames.join(' ')}
           style={this.style(comic)}>
        <div className="comic-tile__detail">
          <h3>{comic.title}</h3>
        </div>
      </div>
    )
  }
}

