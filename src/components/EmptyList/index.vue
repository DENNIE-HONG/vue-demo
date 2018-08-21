<template>
  <div class="com-empty">
    <div class="com-empty-pic"></div>
    <span
      v-once
      class="com-empty-txt">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'EmptyList',
  props: {
    text: {
      default: '这里空空如也',
      type: String
    }
  }
}
</script>
<style lang="scss">
.com-empty {
  background-color: white;
  text-align: center;
  &-pic {
    width: rem(300);
    height: rem(300);
    margin: 0 auto rem(30);
    background: url('./img/empty.png') top/100% no-repeat;
  }
  &-txt {
    display: inline-block;
    padding-bottom: rem(40);
    font-size: rem(28);
    color: nth($fblack, 2);
  }
}
</style>


