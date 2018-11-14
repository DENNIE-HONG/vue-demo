<template>
  <div class="login">
    <header></header>
    <form class="login-content">
      <BaseInput
        placeholder="昵称"
        v-model.trim="name"
        class="login-input"
        maxlength="10"
        clearable
      />
      <BaseInput
        placeholder="密码"
        v-model.trim="password"
        class="login-input"
        maxlength="20"
        type="password"
        clearable
      />
      <div
        v-show="!isRegister"
        class="btn-primary btn-large"
        @click="submit">登录</div>
      <div
        v-show="isRegister"
        class="btn-primary btn-large"
        @click="register">注册</div>
      <p v-show="!isRegister">
        没有账号？
        <span
          class="login-register"
          @click="isRegister = true">点击注册</span>
      </p>
    </form>
  </div>
</template>
<script>
import { postLogin, signUp } from 'service/api/user.js';
export default {
  name: 'Login',
  metaInfo: {
    title: 'my login',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue登录页'
      },
      {
        'name': 'description',
        'content': 'vue登录页'
      }
    ]
  },
  data () {
    return {
      name: '',
      password: '',
      sendData: {
        name: '',
        password: ''
      },
      isRegister: false,
      isLoading: false
    }
  },

  methods: {
    submit () {
      const errorMsg = this.check();
      if (errorMsg) {
        this.showError(errorMsg);
        return;
      }
      this.combineData();
      this.postData();
    },
    // 校验
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
    },
    // 组合数据
    combineData () {
      const { name, password } = this;
      this.sendData = {
        name,
        password
      };
    },
    // 请求数据
    postData () {
      postLogin(this.sendData).then(() => {
        this.$router.push('/my');
      }).catch((res) => {
        this.showError(res.msg);
      });
    },
    // 注册
    async register () {
      const errorMsg = this.check();
      if (errorMsg) {
        this.showError(errorMsg);
        return;
      }
      if (this.isLoading) {
        this.showError('正在发送，请稍候');
        return;
      }
      this.isLoading = true;
      this.combineData();
      try {
        await signUp(this.sendData);
        this.isRegister = false;
        this.$message({
          type: 'success',
          message: '注册成功！'
        });
      } catch (err) {
        this.showError(err.msg);
      } finally {
        this.isLoading = false;
      }
    },
    showError (text) {
      this.$message({
        type: 'error',
        message: text
      });
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
  &-register {
    color: nth($fgreen, 1);
    text-decoration: underline;
  }
}
</style>


