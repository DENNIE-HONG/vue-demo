<template>
  <label class="com-radio">
    <span><slot></slot></span>
    <input type="radio" class="com-radio-input" :name="name" />
  </label>
</template>
<script>
export default {
  name: 'BaseRadio',
  props: {
    name: {
      default: 'radio',
      type: String
    }
  }
}
</script>
<style lang="scss">
.com-radio {
  display: block;
  padding: rem(20);
  background-color: white;
  font-size: rem(30);
  border-bottom: 1px solid nth($fgray, 1);
  &:last-child {
    border-bottom: 0;
  }
  &-input {
    opacity: 0;
  }
}
</style>
