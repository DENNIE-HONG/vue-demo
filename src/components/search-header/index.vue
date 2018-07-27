<template>
  <div class="search-header" v-on:click="showSearch">
    <i class="iconfont icon-search"></i>
    <div class="search-header-txt">搜索你感兴趣的</div>
  </div>
</template>
<script>
import Vue from 'vue';
import Search from './search.vue';
export default {
  name: 'SearchHeader',
  methods: {
    showSearch: function() {
      lockWindow();
      const root = document.createElement('div');
      document.body.appendChild(root);
      const props = {
        placeholder: '搜索你感兴趣的'
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
/**
 * 锁屏
*/
function lockWindow ({isLock = true} = {}) {
  isLock && document.documentElement.classList.add('lock');
  !isLock && document.documentElement.classList.remove('lock');
}
</script>

<style>

</style>

