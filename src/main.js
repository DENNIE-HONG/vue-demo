import Vue from 'vue';
import Meta from 'vue-meta'
// 引入插件
import router from './plugins/router.js';
import inject from './plugins/inject.js'
import App from './App';
import 'assets/main.scss';
Vue.use(Meta);
Vue.use(inject);
new Vue({
  el: '#app',
  router,
  components: { App },
  render (createElement) {
    return createElement('App')
  }
});
