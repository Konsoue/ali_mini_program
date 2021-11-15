const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true, // 这一行解决了 devServer 对 react-router-dom 的影响
  },
}

module.exports = merge(common, dev);