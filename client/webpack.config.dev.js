var DashboardPlugin = require('webpack-dashboard/plugin')
var webpackConfig = require('./webpack.config')

webpackConfig.plugins.push(new DashboardPlugin())

module.exports = webpackConfig
