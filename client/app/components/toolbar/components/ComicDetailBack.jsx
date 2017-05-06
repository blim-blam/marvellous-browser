import React from 'react'
import { Link } from 'react-router'
import './ComicDetailBack.pcss'

export function ComicDetailBack () {
  return (
    <Link to="/comics"
          className="comic__back-button">
      <i className="comic__back-button__arrow"></i>
    </Link>
  )
}
