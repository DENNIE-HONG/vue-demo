<template>
  <div class="my">
    <header>
      <div class="my-behavior">
        <div class="my-info">
          <img class="my-avatar" :src="avatar" />
          <span v-if="isLogin">{{name}}</span>
        </div>
      </div>
      <router-link to="/setting" class="my-setting" v-if="isLogin">设置</router-link>
    </header>
    <div class="my-login">
      <span>{{name}}</span>
      <router-link to="/login" class="pull-right">{{isLogin? '退出' : '登入'}}</router-link>
    </div>
    <!-- <the-footer></the-footer> -->
  </div>
</template>
<script>
import { getUser } from 'service/api/user.js';
import TheFooter from 'coms/Layout/TheFooter.vue';
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
      border-radius: 50%;
      border: rem(4) solid nth($fgray, 1);
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
  &-info {
    display: inline-block;
    margin-left: rem(40);
    margin-top: rem(-60);
    span {
      display: inline-block;
      vertical-align: top;
      font-size: rem(34);
      color: white;
    }
  }
  &-setting {
    position: absolute;
    top: rem(20);
    right: rem(20);
    padding: rem(7) rem(20);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: rem(30);
    font-size: rem(24);
    color: white;
  }
}
</style>


