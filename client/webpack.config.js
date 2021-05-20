const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
      js: './src/index.js'
  },
  mode: 'development',
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                          plugins: [
                              'lodash'
                          ],
                          presets: [['@babel/env', { modules: false, targets: { 'node': 6 } }]]
                      }
                  }
              ],
              exclude: /node_modules/
          }
      ]
  },
  resolve: {
      extensions: [
          '.js',
          '.jsx'
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'YouTube Clipper',
          template: './src/public/index.html',
          filename: 'index.html'
      })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
