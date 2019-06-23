const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const plugins = require('./config/dev-plugins');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  plugins,
});
