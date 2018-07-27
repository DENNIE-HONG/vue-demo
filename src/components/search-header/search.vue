<template>
  <div class="search">
    <header class="search-box">
      <div class="search-header">
        <i class="iconfont icon-search"></i>
        <input type="text" class="search-header-input" :placeholder="placeholder" v-model="value"/>
      </div>
      <button v-on:click="destroy">取消</button>
    </header>
    <article class="search-result">
      <ul>
        <li class="search-result-item" v-for="item in result">{{item[0]}}</li>
      </ul>
    </article>
  </div>
</template>
<script>
import { debounce } from 'throttle-debounce';
export default {
  name: 'Search',
  props: ['placeholder'],
  data () {
    return {
      value: '',
      result: [],
      sendData: {
        q: ''
      }
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      this.debounceGetSearch();
    }
  },
  created() {
    this.debounceGetSearch = debounce(400, this.getSearch);
  },
  methods: {
    destroy () {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    getSearch () {
      if (!this.value) {
        return;
      }
      this.sendData.q = this.value;
      this.$api['api/search'](this.sendData).then((res) => {
        this.result = res.data.result;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="scss">
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  padding: rem(20);
  background-color: nth($fgray, 3);
  &-box {
    display: flex;
    .search-header {
      flex: 1;
    }
  }
  button {
    padding: 0 rem(30);
  }
  &-result {
    background-color: white;
    &-item {
      padding: rem(30) rem(40);
      font-size: rem(28);
      line-height: rem(40);
      border-bottom: 1px solid nth($fgray, 1);
    }
  }
}
</style>
