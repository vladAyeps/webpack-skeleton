const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const pathsToClean = [
  'dist/css',
  'dist/js',
];

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
  devServer: {
    port: 8000,
    contentBase: path.resolve('public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
              interpolate: true
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: process.env.PUBLIC_PATH,
          use: [
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
                    env: this.mode,
                  }
                }
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: process.env.PUBLIC_PATH,
          use: [
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
                    env: this.mode,
                  }
                }
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
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
        test: /\.(png|jp(e*)g|svg|gif)$/,
        exclude: [path.resolve(__dirname, 'src/images/svg-sprite'), path.resolve(__dirname, 'src/fonts')],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // Convert images < 1kb to base64 strings
            name: 'images/[hash].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(pathsToClean, {
      watch: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head',
      title: process.env.TITLE,
    }),
    new ExtractTextPlugin('./css/style.[hash].css', {
      publicPath: process.env.PUBLIC_PATH,
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.[hash].css',
      chunkFilename: '[id].css',
    }),
  ],
};
