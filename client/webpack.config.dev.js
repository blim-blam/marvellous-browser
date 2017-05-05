var DashboardPlugin = require('webpack-dashboard/plugin')
var webpackConfig = require('./webpack.config')
var WriteFilePlugin = require('write-file-webpack-plugin')

webpackConfig.plugins.push(new DashboardPlugin())
webpackConfig.plugins.push(new WriteFilePlugin())

webpackConfig.devServer = {
  historyApiFallback: true,
  port: '8080',
  host: '0.0.0.0',
  proxy: {
    '/graphql': {
      target: 'http://localhost:3000',
      secure: false,
    }
  }
}

module.exports = webpackConfig
