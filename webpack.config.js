const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    main: ['@babel/polyfill', resolve(__dirname, './src/main.js'), resolve(__dirname, './src/style.scss')],
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.html', '.scss', '.css'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/i,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-class-properties', 'syntax-dynamic-import'],
            },
          },
          {
            loader: 'eslint-loader',
          },
          {
            loader: 'prettier-loader',
          },
        ],
      },
      {
        test: /\.s?css$/i,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf|jpg)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, './src/index.html'),
      excludeAssets: [/style.js/],
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './src/about.html',
      excludeAssets: [/style.js/],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
    new WebpackBar(),
    new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }]),
  ],
  watchOptions: {
    aggregateTimeout: 500,
  },
  performance: { hints: false },
  stats: 'minimal',
};

module.exports = config;
