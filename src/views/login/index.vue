<template>
  <div class="login">
    <header></header>
    <form>
      <Input placeholder="昵称" v-modal="name" />
      <div class="btn-primary btn-large" @click="submit">登录</div>
    </form>
  </div>
</template>
<script>
import Input from 'coms/input/index.vue';
export default {
  name: 'Login',
  components: {
    Input
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    submit () {
      console.log(this.name);
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
  form {
    width: 80%;
    margin: auto;
  }
}
</style>


