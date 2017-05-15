import path from 'path'
import fs from 'fs'

exports.register = function (
  server,
  options,
  next
) {
  const PUBLIC_DIR = path.join(__dirname, '../../client/public')
  const HTML_PATH = path.resolve(PUBLIC_DIR, 'index.html')

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (
      request,
      reply
    ) => {
      const filePath = path.resolve(PUBLIC_DIR, request.params.path)
      fs.stat(filePath, (
        error,
        stat
      ) => {
        if (error || stat.isDirectory()) {
          server.log('INFO', {
            reply: 'HTML',
            HTML_PATH
          })
          return reply.file(HTML_PATH, {
            confine: false
          })
        }

        console.log('INFO', {
          reply: 'FILE',
          filePath
        })
        return reply.file(filePath, {
          confine: false
        })
      })
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'staticServer',
  version: '1.0.0'
}
