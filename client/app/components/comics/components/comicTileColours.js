import randomColor from 'randomcolor'

const colourMap = {}

/**
 * Some comics lack thumbnails. To enhance UX, the site will assign a random nice colour
 * to these comics, which is combined with a rough noise texture.
 *
 * This function ensures a consistent colour used for a given comic throughout a user's browsing session, instead of a new random colour each time React re-renders a given comic
 */
export const getColourForComicId = (id) => {
  if (!colourMap[id]) {
    colourMap[id] = randomColor()
  }

  return colourMap[id]
}