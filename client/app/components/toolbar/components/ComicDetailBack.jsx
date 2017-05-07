import React from 'react'
import { browserHistory } from 'react-router'
import './ComicDetailBack.pcss'

export function ComicDetailBack () {
  return (
    <a className="comic__back-button"
       onClick={() => {
         if (browserHistory.getCurrentLocation().key) {
           return browserHistory.goBack()
         }
         return browserHistory.push('/comics')
       }}
    >
      <i className="comic__back-button__arrow"></i>
    </a>
  )
}
