<template>
  <div class="my">
    <header>
      <a class="my-back"><i class="iconfont icon-left"></i>返回</a>
      <SearchHeader />
      <router-link to="/login" class="my-login"></router-link>
    </header>
  </div>
</template>
<script>
import SearchHeader from 'coms/search-header/index.vue';
export default {
  name: 'My',
  components: {
    SearchHeader
  }
}
</script>
<style lang="scss">
.my {
  header {
    display: flex;
    height: rem(90);
    padding: 0 rem(20);
    background-color: nth($fgreen, 1);
    align-items: center;
    .my-back {
      color: white;
      font-size: rem(28);
      > .iconfont {
        font-size: rem(26);
      }
    }
    .search-header {
      margin-left: rem(20);
      margin-right: rem(20);
      flex: 1;
      border-radius: rem(30);
    }
    .my-login {
      width: rem(60);
      height: rem(60);
      background: url('../../assets/img/user.png') top/100% no-repeat;
      border-radius: 50%;
    }
  }
}
</style>


