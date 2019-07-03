const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const plugins = require('./config/dev-plugins');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    watch: true,
    devtool: 'cheap-module-eval-source-map',
    plugins,
  });
};
