const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const { getDirectoriesDeep } = require('../bin/util');

const pagePath = path.resolve(__dirname, '../src/page');
const pathsToClean = [
  'dist/css',
  'dist/js',
];
const { TEMPLATE_EXT } = process.env;

const html = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: `./src/index.${TEMPLATE_EXT}`, // указать шаблон при необходимости
    title: 'Webpack Skeleton',
  }),
];

/**
 * Scan src/page and find dir/index as individual page
 */
const pages = getDirectoriesDeep(path.resolve(__dirname, '../src/page'));
pages.forEach((dir) => {
  const index = path.resolve(dir, `index.${TEMPLATE_EXT}`)
  if (fs.existsSync(index)) {
    html.push(
      new HtmlWebpackPlugin({
        filename: index.replace(pagePath, '').replace(TEMPLATE_EXT, 'html'),
        template: index,
        title: 'Webpack Skeleton',
      }),
    );
  }
});

module.exports = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),
  new CleanWebpackPlugin(pathsToClean, {
    watch: true,
  }),
  new MiniCssExtractPlugin({
    filename: './css/style.[hash].css',
    chunkFilename: '[id].css',
  }),
].concat(html);
