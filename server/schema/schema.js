export default`
type Comics {
  comics: [Comics]
}

type Comic {
  id: Int!
  title: String
  thumbnail: String
  images: [String]
  hasImages: Boolean
  description: String
  characters: [Character]
}

type Character {
  id: Int!
  name: String
  role: String
  description: String
  thumbnail: String
  comicsTotal: Int
  comics: [Comic]
}

type Query {
  comic(id: Int!): Comic
  comics(
    start: Int = 0, 
    limit: Int = 12, 
    orderBy: String,
    titleStartsWith: String,
    characterIds: [Int]
  ): [Comic]
  
  character(id: Int!): Character
  characters(
    start: Int = 0,
    limit: Int = 12,
    orderBy: String,
    nameStartsWith: String
  ): [Character]
}
`
