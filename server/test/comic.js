import 'babel-polyfill'
import Lab from 'lab'
import Code from 'code'
import { getServer } from '../server'
const lab = exports.lab = Lab.script()
const expect = Code.expect

lab.experiment('Comic', () => {
  let server
  lab.beforeEach(async () => {
    server = await getServer()
  })

  const COMIC_QUERY = `query ($id: Int!) {
    comic(id: $id) {
      id
      title
      images
      description
      characters {
        id
        description
        name
        role
        thumbnail
        __typename
      }
      __typename
    }
  }`

  lab.test('query comic "Deadpool (2010) #1000", id: 33685', (done) => {
    const options = {
      method: 'POST',
      url: '/graphql',
      payload: {
        query: COMIC_QUERY,
        variables: {
          id: 33685
        }
      }
    }

    server.inject(options, (response) => {
      expect(response.statusCode)
        .to
        .equal(200)
      const result = JSON.parse(response.result)
      expect(result.data.comic.id)
        .to
        .equal(33685)
      expect(result.data.comic.title)
        .to
        .equal('Deadpool (2010) #1000')
      expect(result.data.comic.characters.length)
        .to
        .equal(1)

      server.stop(done)
    })
  })
})
