<template>
  <div id="app">
    <router-view :key="$route.fullpath +new Date()"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app'
  };
</script>
