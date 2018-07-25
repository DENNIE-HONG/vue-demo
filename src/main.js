import Vue from 'vue';
import App from './App';
import 'assets/main.scss';
new Vue({
  el: '#app',
  components: { App },
  render (createElement) {
    return createElement('App')
  }
});
