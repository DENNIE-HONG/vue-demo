<template>
  <div class="com-radio-group modal-bg black">
    <div class="com-radio-box">
      <h3>{{title}}</h3>
    </div>
  </div>
</template>
<script>
/**
 * 单选组模块
 * @author luyanhong
*/
export default {
  name: 'BaseRadioGroup',
  props: {
    title: {
      default: '请选择',
      type: String
    }
  },
}
</script>
<style lang="scss">
.com-radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
  .com-radio-box {
    width: 80%;
    padding: 0 rem(20);
    background-color: white;
    border-radius: rem(4);
    box-sizing: border-box;
  }
}
</style>


