const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'build/[name].[hash:8].js',
    publicPath: '/',
    chunkFilename: 'build/[id].[chunkhash:8].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.p?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build/[name].[hash:8].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT)
    })
  ]
}
