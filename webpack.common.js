const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

const plugins = require('./config/common-plugins');
const sharpAdapter = require('./bin/sharp-adapter');

const { PUBLIC_PATH, IMAGE_PATH } = process.env;

module.exports = (env, argv) => ({
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: './js/[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      fonts: path.resolve(__dirname, './src/fonts'),
      images: path.resolve(__dirname, './src/images'),
      '~': path.join(__dirname, 'src'),
    },
  },
  devServer: {
    port: 8000,
    contentBase: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitErrors: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
            },
          },
        ],
      },
      {
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: PUBLIC_PATH,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                ctx: {
                  env: argv.mode,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: PUBLIC_PATH,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                ctx: {
                  env: argv.mode,
                },
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src/images/svg-sprite'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {},
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        exclude: [
          path.resolve(__dirname, 'src/images'),
        ],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // Convert images < 1kb to base64 strings
            name: 'fonts/[hash]-[name].[ext]',
          },
        }],
      },
      {
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
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        exclude: [
          path.resolve(__dirname, 'src/images/svg-sprite'),
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // Convert images < 1kb to base64 strings
            name: `${IMAGE_PATH}[hash].[ext]`,
          },
        }],
      },
    ],
  },
  plugins,
});
