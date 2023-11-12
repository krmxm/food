'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

<<<<<<< HEAD
  module: {}
=======
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/, // мы находим наши js файлы (регулярное выражение)
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [['@babel/preset-env', {
  //               debug: true,
  //               // corejs: 3,
  //               useBuiltIns: "usage"
  //           }]]
  //         }
  //       }
  //     }
  //   ]
  // }
>>>>>>> 8860f8873ba3c045229ae38ba21447d288829a92
};
