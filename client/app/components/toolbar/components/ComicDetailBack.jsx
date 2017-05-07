import React from 'react'
import { browserHistory } from 'react-router'
import './ComicDetailBack.pcss'
import ifElse from 'ramda/src/ifElse'
import isNil from 'ramda/src/isNil'

const goBackOrToComics = ifElse(
  isNil,
  () => browserHistory.push('/comics'),
  browserHistory.goBack
)

export function ComicDetailBack () {
  return (
    <a className="comic__back-button"
       onClick={() => goBackOrToComics(browserHistory.getCurrentLocation().key)}>
      <i className="comic__back-button__arrow"/>
    </a>
  )
}
