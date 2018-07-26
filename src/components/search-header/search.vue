<template>
  <div class="search">
    <header class="search-box">
      <div class="search-header">
        <i class="iconfont icon-search"></i>
        <input type="text" class="search-header-input" :placeholder="placeholder"/>
      </div>
      <button v-on:click="destroy">取消</button>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Search',
  props: ['placeholder', 'domNode'],
  methods: {
    destroy: function() {
      console.log(this.domNode);
      this.domNode.parentNode.removeChild(this.domNode);
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
}
</style>
