const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('./html-plugin');

const pathsToClean = [
  'dist/css',
  'dist/js',
];


module.exports = [
  new webpack.ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery',
  }),
  new CleanWebpackPlugin(pathsToClean, {
    watch: true,
  }),
  new MiniCssExtractPlugin({
    filename: './css/style.[hash].css',
    chunkFilename: '[id].css',
  }),
].concat(htmlPlugin);
