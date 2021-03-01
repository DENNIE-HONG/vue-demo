# 练习vue

## 记踩过的坑：
### 1、路由懒加载报错原因
babel配置注意去掉comments：false

### 2、preload-webpack-plugin报错
用了webpack4, preload插件报错cb is not a function
改用了v3.0.0-beta.2 版本好了

### 3、京东的api增加了referer限制
改用代理koa-server-http-proxy匹配，并增加headers里的referer


## 优化
1.函数式组件
在无状态、无生命周期、无响应式数据

```
<template functional>
xxx
</template>
```
