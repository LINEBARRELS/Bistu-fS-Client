var webpack = require('webpack');
// import { join } from 'path';
var join = require('path').join;

module.exports = {
  entry: ['./app/index.js'],
  output: {
    path: join(process.cwd(), './app/dist'),
    filename: 'f.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "style-loader"
      //     }, {
      //       loader: "css-loader"
      //     }
      //   ]
      // },
      // {
      //       test: /\.less$/,
      //       use: [{
      //           loader: "style-loader"
      //       }, {
      //           loader: "css-loader"
      //       }, {
      //           loader: "less-loader" // compiles Less to CSS
      //       }]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ["import", {
                  "libraryName": "antd",
                  "style": false, // or 'css'
                }]
            ],
            presets: [["es2015"], ["react"]]
          }
        }
      }
    ]
  },
  externals: {
    fs: 'require("fs")',
    electron: 'require("electron")',
    react: 'React',
    reactdom: 'ReactDOM',
    //antd:'antd',
    parseT: 'require("parse-torrent")',
    transitionGroup: 'ReactTransitionGroup'
  },
  performance: {
    hints: "warning"
  }
}
