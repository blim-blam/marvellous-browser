import randomColor from 'randomcolor'

const colourMap = {}

/**
 * Some items lack thumbnails. To enhance UX, the site will assign a random nice colour
 * to these items, which is combined with a rough noise texture.
 *
 * This function ensures a consistent colour used for a given item throughout a user's browsing session, instead of a new random colour each time React re-renders a given item
 */
export const getColourForKey = (key) => {
  if (!colourMap[key]) {
    colourMap[key] = randomColor()
  }

  return colourMap[key]
}