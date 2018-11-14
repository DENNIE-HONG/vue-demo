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

const { WEBPACK_PROD_CONFIG } = require('./config');
const { port } = WEBPACK_PROD_CONFIG;

require('dnscache')({
  'enable': true
});
const app = new Koa();
app.use(helmet())
  .use(logger())
  .use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
  }))
  .use(serve(path.resolve(__dirname, './dist'), {
    maxage: 31536000000
  }))
  .use(ctx => {
    if (ctx.url === '/sw.js') {
      ctx.set('Cache-Control', 'no-cache');
      ctx.type = 'application/javascript';
      ctx.body = fs.readFileSync('sw.js');
    }
  })
  .use(ctx => {
    ctx.compress = true;
    ctx.set('Cache-control', 'must-revalidate, no-store');
    ctx.type = 'html';
    ctx.body = fs.readFileSync(WEBPACK_PROD_CONFIG.assetsViews);
  })
  .use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.body = 'not found';
      }
    } catch (err) {
      // 处理500
      ctx.response.status = 500;
      ctx.throw(err);
    }
  })
  .listen(port, ()=> {
    console.log(`打开localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(err);
  });
