<template>
  <div
    class="search-header"
    @click="showSearch">
    <i class="iconfont icon-search"></i>
    <div :class="['search-header-txt', {active: defaultValue}]">{{defaultValue ? defaultValue: placeholder}}</div>
  </div>
</template>
<script>
import Vue from 'vue';
import SearchSuggest from './SearchSuggest.vue';
import router from '../../plugins/router';
/**
 * 锁屏
 * @param {Object} { isLock: true} 是否锁屏
*/
function lockWindow ({ isLock = true } = {}) {
  isLock && document.documentElement.classList.add('lock');
  !isLock && document.documentElement.classList.remove('lock');
}
/**
 * 搜索头部模块
 * @param {String}   placeholder
 * @author luyanhong 2018-07-30
 * @example
 * <search-header placeholder="搜索"></search-header>
*/
export default {
  name: 'SearchHeader',
  props: {
    placeholder: {
      default: '搜索你感兴趣的',
      type: String
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  methods: {
    showSearch () {
      lockWindow();
      const root = document.createElement('div');
      document.body.appendChild(root);
      const props = {
        placeholder: this.placeholder,
        defaultValue: this.defaultValue
      };
      new Vue({
        el: root,
        components: { SearchSuggest },
        router,
        render (createElement) {
          return createElement('SearchSuggest', {
            props
          });
        }
      })
    }
  }
}
</script>

