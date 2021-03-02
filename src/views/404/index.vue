<template>
  <div class="not-found">
    <div class="not-found-pic"></div>
    <h1 class="not-found-title">404</h1>
    <p class="not-found-txt">this page is missing</p>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: 'not-found',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue404页'
      },
      {
        'name': 'description',
        'content': 'vue404页'
      }
    ]
  }
}
</script>
<style lang="scss">
.not-found {
  margin: auto;
  height: 100%;
  text-align: center;
  background-color: white;
  @include hid;
  &-pic {
    height: rem(400);
    margin-top: rem(100);
    background: url('./img/notfound.png') top/auto 100% no-repeat;
  }
  &-title {
    font-size: rem(80);
    font-weight: bold;
  }
  &-txt {
    font-size: rem(36);
  }
}
</style>

