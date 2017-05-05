var DashboardPlugin = require('webpack-dashboard/plugin')
var webpackConfig = require('./webpack.config')

webpackConfig.plugins.push(new DashboardPlugin())

webpackConfig.devServer = {
  historyApiFallback: true,
  publicPath: '/',
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
