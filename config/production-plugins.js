const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const pathsToClean = [
  'dist',
];

module.exports = [
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
  //     android: true,
  //     appleIcon: true,
  //     appleStartup: true,
  //     coast: false,
  //     favicons: true,
  //     firefox: false,
  //     opengraph: false,
  //     twitter: false,
  //     yandex: false,
  //     windows: false,
  //   },
  // }),
];
