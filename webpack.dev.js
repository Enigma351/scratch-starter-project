const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      // optionally serve index.html at root
      publicPath: '/'
    },
    port: 3000,
    hot: true,
    open: false,
    historyApiFallback: true
  },
  devtool: 'eval-cheap-module-source-map'
});
