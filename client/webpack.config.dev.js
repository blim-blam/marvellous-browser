var webpackConfig = require('./webpack.config')
var DashboardPlugin = require('webpack-dashboard/plugin')
var WriteFilePlugin = require('write-file-webpack-plugin')
var path = require('path')

webpackConfig.devtool = 'source-map'

webpackConfig.plugins.push(new DashboardPlugin())
webpackConfig.plugins.push(new WriteFilePlugin())

webpackConfig.devServer = {
  historyApiFallback: true,
  port: '8080',
  host: '0.0.0.0',
  contentBase: path.resolve('public'),
  disableHostCheck: true,
  proxy: {
    '/graphql': {
      target: 'http://localhost:3000',
      secure: false
    }
  }
}

module.exports = webpackConfig
