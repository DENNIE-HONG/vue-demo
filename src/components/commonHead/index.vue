<template>
  <div class="com-header">
    <a href="javascript:;" class="com-header-user"><i class="iconfont icon-user"></i></a>
    <div class="com-header-logo"></div>
  </div>
</template>
<script>
export default {
  name: 'CommonHead',
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
<style lang="scss">
.com-header {
  height: rem(188);
  padding: rem(10);
  box-sizing: border-box;
  &-user {
    float: left;
    > .iconfont {
      font-size: rem(36);
    }
  }
  &-logo {
    display: block;
    width: rem(70);
    height: rem(70);
    margin: 0 auto;
    background: url('./img/logo.png') top/100% no-repeat;
  }
}
</style>
