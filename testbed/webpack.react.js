const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    open: true,
    port: 1234
  },
  entry: {
    app: './testbed/react.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './testbed/index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
};
