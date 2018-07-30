<template>
  <div class="search-header" v-on:click="showSearch">
    <i class="iconfont icon-search"></i>
    <div class="search-header-txt">搜索你感兴趣的</div>
  </div>
</template>
<script>
import Vue from 'vue';
import Search from './search.vue';
/**
 * 锁屏
*/
function lockWindow ({ isLock = true } = {}) {
  isLock && document.documentElement.classList.add('lock');
  !isLock && document.documentElement.classList.remove('lock');
}
/**
 * 搜索头部模块
 * @param {String}   placeholder
 * @author luyanhong 2018-07-30
*/
export default {
  name: 'SearchHeader',
  props: ['placeholder'],
  methods: {
    showSearch () {
      lockWindow();
      const root = document.createElement('div');
      document.body.appendChild(root);
      const props = {
        placeholder: this.placeholder || '搜索你感兴趣的'
      };
      new Vue({
        el: root,
        components: { Search },
        render (createElement) {
          return createElement('Search', {
            props
          });
        }
      })
    }
  }
}
</script>

<style>

</style>

