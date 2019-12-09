const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: false,
  devServer: {
    open: true,
    port: 1234
  },
  entry: {
    app: './testbed/vue.js'
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
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
};
