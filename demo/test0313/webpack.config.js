const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  // entry: index.js,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash:4].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new CleanWebpackPlugin()
  ]
}