/* eslint-disable */
/* tslint:disable */
const Encore = require('@symfony/webpack-encore');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin/dist/index').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const sharpAdapter = require('./bin/sharp-adapter');
const dotenv = require('dotenv');

dotenv.config();

const configureHtmlPlugin = require('./config/encore-html-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

const {
  IMAGE_PATH,
  PUBLIC_PATH,
  DEV_SERVER_MODE,
  SVG_SPRITE_EXTRACT,
  AUTO_PROVIDE_JQUERY
} = process.env;

Encore
    .setOutputPath('dist/')
    .setManifestKeyPrefix('/dist/')
    .setPublicPath(PUBLIC_PATH)

    .addEntry('bundle', './src/index.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    // .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableTypeScriptLoader()
    .enableSassLoader()
    .enablePostCssLoader((opts) => {
      opts.config = {
        ctx: {
          isProd: Encore.isProduction() || DEV_SERVER_MODE === 'prod',
        }
      }
    })

    // Fonts
    .disableFontsLoader()
    .addLoader({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            esModule: false,
          }
        }
      ]
    })
    // Images
    .disableImagesLoader()
    .addRule({
      test: /\.(jpe?g|png)$/i,
      use: [
        {
          loader: 'responsive-loader',
          options: {
            adapter: sharpAdapter,
            outputPath: IMAGE_PATH,
          },
        },
      ],
    })
    .addRule({
      test: /\.(png|jp(e*)g|svg|gif)$/,
      exclude: [path.resolve(__dirname, 'src/images/svg-sprite'), path.resolve(__dirname, 'src/fonts')],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1000, // Convert images < 1kb to base64 strings
          name: `${IMAGE_PATH}/[hash].[ext]`,
          esModule: false,
        },
      }],
    })
    // SVG Sprite
    .addRule({
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, 'src/images/svg-sprite'),
      ],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: SVG_SPRITE_EXTRACT === 'true',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            svgo: {},
          },
        },
      ],
    })
    .addPlugin(new SpriteLoaderPlugin())

    // Pug Loader
    .addRule({
      test: /\.pug$/,
      use: [
        'pug-loader',
      ],
    })
    // HTML Loader
    .addRule({
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false,
            interpolate: true,
          },
        },
      ],
    })
    // .copyFiles({
    //   from: './src/images/static',
    // })
;

if (AUTO_PROVIDE_JQUERY === 'true') {
  Encore.autoProvidejQuery();
}

configureHtmlPlugin(Encore);

if(Encore.isProduction() || DEV_SERVER_MODE === 'prod') {
  Encore
      .addPlugin(new CompressionPlugin({
        test: /\.(html|css|js)(\?.*)?$/i, // only compressed html/css/js, skips compressing sourcemaps etc
      }))
      .addPlugin(new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        gifsicle: { // lossless gif compressor
          optimizationLevel: 9,
        },
        pngquant: ({ // lossy png compressor, remove for default lossless
          quality: '80',
        }),
        plugins: [
          imageminMozjpeg({ // lossy jpg compressor, remove for default lossless
            quality: '80',
          }),
        ],
      }))
}

const webpackConfig = Encore.getWebpackConfig();

webpackConfig.resolve.alias = {
  ...webpackConfig.resolve.alias,
  images: path.resolve(__dirname, './src/images'),
  fonts: path.resolve(__dirname, './src/fonts'),
  '~': path.resolve(__dirname, 'src')
};

module.exports = webpackConfig;
