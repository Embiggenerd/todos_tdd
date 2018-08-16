const webpack = require('webpack');
const {resolve} = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // resolve: {
  //   extensions: ['*', '.js', '.jsx']
  // },
  devServer: {
    contentBase: resolve(__dirname,'dist'),
    hot: true
  }
}
