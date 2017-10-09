var webpack = require('webpack');

module.exports = {
  entry: ['./app/index.js'],
  
  output: {
    path: './app/',
    filename: 'f.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  externals:{
   fs: 'require("fs")',
   electron:'require("electron")',
   react:'window.React',
   reactdom:'window.ReactDOM',
   parseT:'require("parse-torrent")',
   transitionGroup:'ReactTransitionGroup'
 },
 performance: {
  hints: "warning"
}
}