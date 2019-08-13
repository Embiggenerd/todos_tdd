const webpack = require('webpack');
const { resolve } = require('path');

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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    index: '',
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    proxy: {
      context: () => true,
      '/': 'http://localhost:3000'
    }
  },
  devtool: 'inline-cheap-module-source-map'
};
