const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../src/favicon.ico'),
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?(js|ts|jsx|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: "usage",
                corejs: 3
              }],
              ['@babel/preset-typescript'],
              ['@babel/preset-react']

            ],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-loader',
        options: {
          sources: true,
        }
      },
      {
        test: /\.(mp3|cda|wav|wma|mid|midi)$/i,
        type: 'asset/resource',
      }
    ],
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx', 'ts', 'tsx'],
    roots: [__dirname, path.resolve(__dirname, '../src')]
  }
};