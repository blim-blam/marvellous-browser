export default`
type Comics {
  comics: [Comics]
}

type Comic {
  id: Int!
  title: String
  thumbnail: String
  images: [String]
}

type Query {
  comic(id: Int!): Comic
  comics(start: Int = 0, limit: Int = 25): [Comic]
}
`
