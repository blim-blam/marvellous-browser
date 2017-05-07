import 'babel-polyfill'
import Lab from 'lab'
import Code from 'code'
import { getServer } from '../server'
const lab = exports.lab = Lab.script()
const expect = Code.expect

lab.experiment('Comics', () => {

  let server
  lab.beforeEach(async () => {
    server = await getServer()
  })

  const COMICS_QUERY = `query ($start: Int, $limit: Int, $orderBy: String) {
    comics(start: $start, limit: $limit, orderBy: $orderBy) {
        id
        title
        thumbnail
        hasImages
        __typename
    }
  }`

  lab.test('query comics start 12, limit 12, orderBy -issueNumber', (done) => {
    const options = {
      method: 'POST',
      url: '/graphql',
      payload: {
        query: COMICS_QUERY,
        variables: {
          start: 12,
          limit: 12,
          orderBy: '-issueNumber'
        }
      }
    }

    server.inject(options, (response) => {
      expect(response.statusCode)
        .to
        .equal(200)
      const result = JSON.parse(response.result)
      expect(result.data.comics.length)
        .to
        .equal(12)

      server.stop(done)
    })
  })

  lab.test('query comics start 0, limit 6, orderBy title', (done) => {
    const options = {
      method: 'POST',
      url: '/graphql',
      payload: {
        query: COMICS_QUERY,
        variables: {
          start: 0,
          limit: 6,
          orderBy: 'title'
        }
      }
    }

    server.inject(options, (response) => {
      expect(response.statusCode)
        .to
        .equal(200)
      const result = JSON.parse(response.result)
      expect(result.data.comics.length)
        .to
        .equal(6)

      server.stop(done)
    })
  })

  lab.test('query comics start default, limit default, orderBy default', (done) => {
    const options = {
      method: 'POST',
      url: '/graphql',
      payload: {
        query: COMICS_QUERY,
        variables: {}
      }
    }

    server.inject(options, (response) => {
      expect(response.statusCode)
        .to
        .equal(200)
      const result = JSON.parse(response.result)
      expect(result.data.comics.length)
        .to
        .equal(12)

      server.stop(done)
    })
  })
})

