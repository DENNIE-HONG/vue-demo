/**
 * 注入vue原型插件
 * @author luyanhong 2018-07-27
 */
import api from './api.js'
import message from './message';
export default {
  install: (Vue, options) => {
    Vue.prototype.$api = api;
    // 需要挂载的都放在这里
    Vue.prototype.$message = message;
  }
}
