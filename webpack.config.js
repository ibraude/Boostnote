const skeleton = require('./webpack-skeleton')
const path = require('path')

// stylus: {
//   use: [require('nib')()],
// import: [
//     '~nib/lib/nib/index.styl',
//     path.join(__dirname, 'browser/styles/index.styl')
//   ]
// },

var config = Object.assign({}, skeleton, {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]' // translates CSS into CommonJS
          },
          {
            loader: 'stylus-loader', // compiles Stylus to CSS
            options: {
              use: [require('nib')()],
              import: ['~nib/lib/nib/index.styl',
                path.join(__dirname, 'browser/styles/index.styl')
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.styl$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     {
      //       loader: 'stylus-loader',
      //       options: {
      //         use: [require('nib')()],
      //         import: ['~nib/lib/nib/index.styl',
      //           path.join(__dirname, 'browser/styles/index.styl')
      //         ]
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.styl$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      // },
    ]
  },
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:8080/assets/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    quiet: false,
    publicPath: 'http://localhost:8080/assets/'
  }
})

module.exports = config

