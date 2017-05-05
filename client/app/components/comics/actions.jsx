import { COMICS_CHANGE_SORT_ORDER, COMICS_LOAD_MORE, COMICS_LOADED_MORE } from './constants'

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

export function changeComicsSortOrder(newOrder){
  return {
    type: COMICS_CHANGE_SORT_ORDER,
    newOrder
  }
}
