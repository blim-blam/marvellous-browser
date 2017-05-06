import randomColor from 'randomcolor'

const colourMap = {}

export const getColourForComicId = (id) => {
  if (!colourMap[id]) {
    colourMap[id] = randomColor()
  }

  return colourMap[id]
}