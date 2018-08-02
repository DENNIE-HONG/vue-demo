<template>
  <input class="com-input" :type="type" :placeholder="placeholder" :maxlength="maxlength" :value="value" @input="$emit('input', $event.target.value)"/>
</template>
<script>
/**
 * 输入模块
 * @param {Number}  maxlength    输入最大个数，默认100
 * @param {String}  placeholder  提示文本
*/
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    type: {
      default: 'text'
    },

    maxlength: {
      default: 100
    },

    placeholder: String,

    value: String
  }
}
</script>
<style lang="scss">
.com-input {
  width: 100%;
  padding: rem(20) rem(20);
  border: 1px solid nth($fgray, 1);
  border-radius: rem(8);
  font-size: rem(28);
  box-sizing: border-box;
  &:active,
  &:hover {
    border-color: nth($fgreen, 1);
  }
}
</style>


