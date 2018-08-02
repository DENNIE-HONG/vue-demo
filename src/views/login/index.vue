<template>
  <div class="login">
    <header></header>
    <form class="login-content">
      <BaseInput
        placeholder="昵称"
        v-model="name"
        class="login-input"
        maxlength="10"
      />
      <BaseInput
        placeholder="密码"
        v-model="password"
        class="login-input"
      />
      <div class="btn-primary btn-large" @click="submit">登录</div>
      <Message message="测试数据啊啊啊啊啊啊啊啊" type="error"/>
    </form>
  </div>
</template>
<script>
import BaseInput from 'coms/BaseInput';
import Message from 'coms/message';
export default {
  name: 'Login',
  components: {
    BaseInput,
    Message
  },

  data () {
    return {
      name: '',
      password: '',
      sendData: {
        name: '',
        password: ''
      }
    }
  },

  methods: {
    submit () {
      const errorMsg = this.check();
      if (errorMsg) {
        console.log(errorMsg);
      }
    },

    check () {
      let errorMsg;
      if (!this.name) {
        errorMsg = '请输入名字';
        return errorMsg;
      }
      if (!this.password) {
        errorMsg = '请输入密码';
        return errorMsg;
      }
      return errorMsg;
    }

  }
}
</script>
<style lang="scss">
.login {
  header {
    width: rem(150);
    height: rem(150);
    margin: rem(100) auto;
    background: url('../../assets/img/logo.png') top/100% no-repeat;
  }
  &-content {
    width: 80%;
    margin: auto;
    .btn-primary {
      margin-top: rem(40);
    }
  }
  &-input {
    margin-bottom: rem(40);
  }
}
</style>


