<template>
  <div>
    <CommonHead />
    <div>hello</div>
  </div>
</template>
<script>
import CommonHead from 'coms/commonHead';
export default {
  name: 'Home',
  components: {
    CommonHead
  },
  metaInfo: {
    title: 'My Vue Home',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue练习首页'
      },
      {
        'property': 'description',
        'content': 'vue练习首页'
      }
    ]
  }
}
</script>
