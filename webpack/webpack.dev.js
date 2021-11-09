const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
}

module.exports = merge(common, dev);