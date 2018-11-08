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

const { WEBPACK_PROD_CONFIG } = require('./config');
const { port } = WEBPACK_PROD_CONFIG;
const app = new Koa();
app.use(logger())
  .use(serve(path.resolve(__dirname, './dist')))
  .use(ctx => {
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
  });
