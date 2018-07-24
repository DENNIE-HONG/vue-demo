/**
 * webpack开发环境配置
 * @author luyanhong 2018-07-24
*/

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WEBPACK_DEV_CONFIG = require('../config').WEBPACK_DEV_CONFIG;
const common = require('./webpack.common');
module.exports = (env) => {
  env.production = env.production !== 'false';
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      filename: 'js/[name].js',
      path: WEBPACK_DEV_CONFIG.assetsDirectory,
      publicPath: WEBPACK_DEV_CONFIG.assetsPublicPath
    },
    devServer: {
      contentBase: WEBPACK_DEV_CONFIG.assetsViews,
      watchContentBase: true,
      port: WEBPACK_DEV_CONFIG.port,
      compress: true,
      hot: true,
      publicPath: WEBPACK_DEV_CONFIG.assetsPublicPath,
      overlay: true,
      watchOptions: {
        ignored: /node_modules/
      },
      stats: {
        colors: true,
        modules: false,
        chunks: false
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    watch: true
  });
}
