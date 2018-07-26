import Vue from 'vue';
import Meta from 'vue-meta'
import router from './plugins/router';
import App from './App';
import 'assets/main.scss';
Vue.use(Meta);
new Vue({
  el: '#app',
  router,
  components: { App },
  render (createElement) {
    return createElement('App')
  }
});
