# 练习vue

## 启动
```
npm run dev
npm run start
```

## 页面结构
- home(首页)
- product(商品页)
- question(问题页, 接口要京东登录，挂了)
- question-detail(问题详情页)
- my(我的)
- setting（设置页）
- search（搜索页）
- cart (购物车，数据来自考拉，要登录的cookie)
- 404

#### 首页
![home](/md_assets/home.png)
#### 商品页
![product](/md_assets/product_1.png)
![](/md_assets/product_2.png)
![](/md_assets/product_3.png)
#### 我的
![my](md_assets/my.png)
#### 设置页
![setting](/md_assets/setting.png)
#### 搜索页
![search](/md_assets/search_1.png)
![search](/md_assets/search_2.png)
## 记踩过的坑：
### 1. 路由懒加载报错原因
babel配置注意去掉comments：false

### 2. preload-webpack-plugin报错
用了webpack4, preload插件报错cb is not a function
改用了v3.0.0-beta.2 版本好了

### 3、京东的api增加了referer限制
改用代理koa-server-http-proxy匹配，并增加headers里的referer


## 优化
1. 函数式组件
在无状态、无生命周期、无响应式数据

```
<template functional>
xxx
</template>
```
