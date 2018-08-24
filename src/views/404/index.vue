<template>
  <div class="page not-found">
    <div class="content">
      <div class="not-found-pic"></div>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-txt">this page is missing</p>
      <router-link to="/" class="btn-primary">go Home</router-link>
    </div>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from 'coms/Layout/TheFooter.vue';
export default {
  name: 'NotFound',
  components: {
    TheFooter
  }
}
</script>
<style lang="scss">
.not-found {
  margin: auto;
  text-align: center;
  background-color: white;
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

