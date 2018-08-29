
/**
 * webpack生产环境配置
 * @author luyanhong 2018-07-24
*/
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const WEBPACK_PROD_CONFIG = require('../config/index.js').WEBPACK_PROD_CONFIG;
module.exports = (env) => {
  return merge(common(env), {
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
          safe: true,
          autoprefixer: {
            remove: false
          }
        })
      ],
      moduleIds: 'hashed'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ],
    output: {
      filename: 'js/[name].[chunkhash:8].js',
      path: WEBPACK_PROD_CONFIG.assetsDirectory,
      publicPath: WEBPACK_PROD_CONFIG.assetsPublicPath
    }
  });
};
