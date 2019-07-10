const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const plugins = require('./config/production-plugins');

module.exports = (env, argv) => merge(common(env, argv), {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins,
});
