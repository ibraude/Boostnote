const skeleton = require('./webpack-skeleton')
const webpack = require('webpack')
const path = require('path')
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin')

var config = Object.assign({}, skeleton, {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }},
          {
            loader: 'stylus-loader',
            options: {
              use: [require('nib')()],
              import: ['~nib/lib/nib/index.styl',
                path.join(__dirname, 'browser/styles/index.styl')
              ]
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // {
      //   test: /(\.js|\.jsx)?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: 'babel-loader'
      // },
      // {
      //   test: /\.styl$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[path]!stylus?sourceMap'
      // },
      {
        test: /\.json$/,
        use: 'json'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    sourceMapFilename: '[name].map',
    publicPath: 'http://localhost:8080/assets/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new NodeTargetPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production')
      }
    })
  ]
})

module.exports = config
