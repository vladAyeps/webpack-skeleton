const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const plugins = require('./config/production-plugins');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
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
};
