
/**
 * webpack生产环境配置
 * @author luyanhong 2018-07-24
*/
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const common = require('./webpack.common');
const { WEBPACK_PROD_CONFIG } = require('../config/index.js');
module.exports = (env) => {
  const webpackConfig = merge(common(env), {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          },
        })
      ],
      moduleIds: 'hashed'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: 'vue-demo',
        filepath: path.resolve(__dirname, '../sw.js'),
        stripPrefix: WEBPACK_PROD_CONFIG.assetsDirectory,
        staticFileGlobs: [
          `${WEBPACK_PROD_CONFIG.assetsDirectory}/fonts/*.*`
        ],
        minify: true,
        runtimeCaching: [{
          urlPattern: /^http:\/\/localhost:5555\/#\//,
          handler: 'networkFirst',
          options: {
            cache: {
              name: 'page-cache',
              maxEntries: 20
            }
          }
        }, {
          urlPattern: /\/js\/(.*)\.(.*)\.js$/,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'js-cache',
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        }, {
          urlPattern: /\/css\/(.*)\.(.*)\.css$/,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'css-cache',
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        }, {
          urlPattern: /\/img\/(.*)\.(png|jpg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'img-cache',
              maxEntries: 30
            }
          }
        }]
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as (entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff$/.test(entry)) return 'font';
          if (/\.(png|jpg|svg|gif)$/.test(entry)) return 'image';
          return 'script';
        },
        include: 'allAssets',
        fileWhitelist: [/\.woff$/]
      })
    ],
    output: {
      filename: 'js/[name].[chunkhash:8].js',
      path: WEBPACK_PROD_CONFIG.assetsDirectory,
      publicPath: WEBPACK_PROD_CONFIG.assetsPublicPath,
      chunkFilename: 'js/[name].[chunkhash:8].js'
    }
  });
  if (process.env.npm_config_report) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  return webpackConfig;
};
