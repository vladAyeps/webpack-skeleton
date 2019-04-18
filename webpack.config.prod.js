const pathsToClean = [
  'dist',
];

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './js/bundle.[hash].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i, // only compressed html/css/js, skips compressing sourcemaps etc
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: { // lossless gif compressor
        optimizationLevel: 9,
      },
      pngquant: ({ // lossy png compressor, remove for default lossless
        quality: '75',
      }),
      plugins: [
        imageminMozjpeg({ // lossy jpg compressor, remove for default lossless
          quality: '75',
        }),
      ],
    }),
    // new FaviconsWebpackPlugin({
    //   logo: './src/images/logo.svg',
    //   icons: {
    //     twitter: true,
    //     windows: true
    //   }
    // }),
  ],
});
