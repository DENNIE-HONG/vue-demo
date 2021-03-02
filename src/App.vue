<template>
  <div id="app">
    <div class="content">
      <keep-alive include="NotFound">
        <router-view :key="$route.fullpath"></router-view>
      </keep-alive>
    </div>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from 'coms/Layout/TheFooter';
export default {
  name: 'app',
  components: {
    TheFooter
  }
};
</script>
<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    width: 100%;
  }
}
</style>

