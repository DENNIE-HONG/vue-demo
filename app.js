/**
 * 模拟生产环境起服务
 * 框架 koa
 * @author luyanhong 2018-11-08
*/
const Koa = require('koa');
const fs = require('fs');
const serve = require('koa-static');
const path = require('path');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const proxy = require('koa-server-http-proxy');

const { WEBPACK_PROD_CONFIG } = require('./config');
const { port } = WEBPACK_PROD_CONFIG;

require('dnscache')({
  'enable': true
});
const app = new Koa();
app
  .use(logger())
  .use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
  }))
  .use(serve(path.resolve(__dirname, './dist'), {
    maxage: 31536000000
  }))
  .use(proxy('/api', {
    target: 'https://suggest.taobao.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }))
  .use(proxy('/jdapi', {
    target: 'https://wq.jd.com',
    changeOrigin: true,
    pathRewrite: { '^/jdapi': '' },
    headers: {
      'Referer': 'https://m.jd.com/?ad_od=3&cu=true&utm_source=baidu-pinzhuan&utm_medium=cpc&utm_campaign=t_288551095_baidupinzhuan&utm_term=ba6fb982ce824f8382e493214bab3b10_0_db4ebebb1c974852a217d15bd0342c23'
    }
  }))
  .use(proxy('/kaola', {
    target: 'https://m.kaola.com',
    changeOrigin: true,
    pathRewrite: { '^/kaola': '' }
  }))
  .use(async (ctx, next) => {
    try {
      await next();
      // service worker
      if (ctx.url === '/sw.js') {
        ctx.set('Cache-Control', 'no-cache');
        ctx.type = 'application/javascript';
        return ctx.body = fs.readFileSync('sw.js');
      }
      // 爬虫协议
      if (ctx.url === '/robots.txt') {
        ctx.type = 'text/plain;charset=utf-8';
        return ctx.body = fs.readFileSync('robots.txt');
      }
      // 页面
      ctx.compress = true;
      ctx.set('Cache-control', 'must-revalidate, no-store');
      ctx.type = 'html';
      ctx.body = fs.readFileSync(WEBPACK_PROD_CONFIG.assetsViews);
      if (ctx.status === 404) {
        ctx.body = 'not found';
      }
    } catch(err) {
      ctx.response.status = 500;
      ctx.throw(err);
    }
  })
  .listen(port, ()=> {
    console.log(`打开http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(err);
  });
