/**
 * webpack通用配置
 * @author luyanhong
*/
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WEBPACK_COMMON_CONFIG = require('../config/index.js').WEBPACK_COMMON_CONFIG;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = (env) => {
  const config = {
    entry: WEBPACK_COMMON_CONFIG.entry,
    resolve: {
      extensions: ['.js','.vue'],
      alias: {
        assets: path.resolve(__dirname, '../src/assets'),
        coms: path.resolve(__dirname, '../src/components'),
        config: path.resolve(__dirname, '../config'),
        utils: path.resolve(__dirname, '../src/utils'),
        views: path.resolve(__dirname, '../src/views'),
        service: path.resolve(__dirname, '../src/service'),
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            minChunks: 3,
            name: 'common',
            minSize: 1000
          },
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      },
    },
    plugins: [
      new CleanWebpackPlugin([
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/`,
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/js/`,
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/css/`,
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/img/`,
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/fonts`
      ], {
        root: WEBPACK_COMMON_CONFIG.projectRoot
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: WEBPACK_COMMON_CONFIG.assetsViews,
        filename: 'index.html',
        // chunks: ['manifst', 'main'],
        inject: true,
        minify: env.production ? {
          removeComments: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        } : false,
        cache: false,
        // chunksSortMode: 'manual',
        xhtml: true,
        favicon: path.resolve(__dirname, '../favicon.ico')
      }),
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: 'manifest.js'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: env.production ? 'babel-loader' : ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !env.production
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !env.production
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !env.production
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [path.resolve(__dirname, '../src/assets/vars.scss'), path.resolve(__dirname, '../src/assets/mixins.scss')]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: env.production ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048,
                name: env.production ? 'fonts/[name].[hash:7].[ext]': 'fonts/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
  };
  return config;
};
