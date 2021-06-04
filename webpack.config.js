const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const webpack = require('webpack')
const dotenv = require('dotenv')


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/resources"),
    filename: "front.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
   })
  ],
  resolve:{
    fallback:{
      "util": false,  // require.resolve("util/")
      "stream": require.resolve("stream-browserify"),
      "buffer": false,
      // "buffer": require.resolve("buffer/"),
    }
  }
};