<template>
  <div class="com-header">
    <a href="javascript:;"><i class="iconfont icon-user"></i></a>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
<style lang="scss" scoped>
.com-header {
  height: rem(88);
  background-color: nth($fgray, 3);
}
</style>
