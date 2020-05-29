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
    publicPath: '/',
    path: resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    historyApiFallback: true,
    hot: false,
    inline: false,
  },
  resolve: {
    extensions: ['.js', '.html', '.scss'],
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
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
      favicon: './src/favicon.ico',
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
