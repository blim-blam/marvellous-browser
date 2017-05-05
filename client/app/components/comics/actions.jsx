import { COMICS_LOAD_MORE, COMICS_LOADED_MORE } from './constants'

export function loadMoreComics () {
  return {
    type: COMICS_LOAD_MORE
  }
}

export function loadedMoreComics () {
  return {
    type: COMICS_LOADED_MORE
  }
}

