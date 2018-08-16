import Vue from 'vue';
import Meta from 'vue-meta';
import VueLazyload from 'vue-lazyload';

// 引入插件
import router from './plugins/router';
import inject from './plugins/inject.js';
import App from './App';
import 'assets/main.scss';
import loadingImg from 'assets/img/loading.gif';
import errorImg from 'assets/img/error.png';
Vue.use(Meta);
Vue.use(inject);

Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: errorImg,
  loading: loadingImg,
  attempt: 1
});
new Vue({
  el: '#app',
  router,
  components: { App },
  render (createElement) {
    return createElement('App')
  }
});
