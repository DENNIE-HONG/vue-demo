<template>
  <div class="my">
    <header>
      <div class="my-behavior">
        <img class="my-avatar" :src="avatar" />
      </div>
    </header>
    <div class="my-login">
      <span>{{name}}</span>
      <router-link to="/login" class="pull-right">{{isLogin? '退出' : '登入'}}</router-link>
    </div>
  </div>
</template>
<script>
import { getUser } from 'service/api/user.js';
export default {
  name: 'My',
  data () {
    return {
      avatar: '',
      name: '',
      isLogin: false
    }
  },
  created () {
    getUser().then((res) => {
      this.avatar = res.data.avatar;
      this.name = res.data.name;
      this.isLogin = res.data.isLogin;
    });
  }
}
</script>
<style lang="scss">
.my {
  header {
    position: relative;
    height: rem(400);
    background: url('./img/bg.png') top/100% no-repeat;
    border-bottom: 1px solid nth($fgray, 1);
    .my-avatar {
      display: inline-block;
      width: rem(130);
      height: rem(130);
      margin: rem(-60) rem(40) 0;
      border-radius: 50%;
    }
  }
  &-behavior {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: rem(150);
    background-color: white;
  }
  &-login {
    height: rem(80);
    margin-top: rem(20);
    padding: 0 rem(20);
    background-color: white;
    border-top: 1px solid nth($fgray, 1);
    border-bottom: 1px solid nth($fgray, 1);
    line-height: rem(80);
  }
}
</style>


