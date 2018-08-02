<template>
  <div class="com-message modal-bg">
    <div class="com-message-txt" :class="type">{{message}}</div>
  </div>
</template>
<script>
export default {
  name: 'Message',
  props: {
    type: {
      default: 'info',
      type: String
    },

    message: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
.com-message {
  display: flex;
  align-items: center;
  justify-content: center;
  &-txt {
    max-width: 80%;
    padding: rem(20) rem(30);
    font-size: rem(28);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: rem(10);
    color: white;
    @include wordbreak;
    &.error {
      color: nth($fred, 1);
      background-color: rgba(nth($fred, 2), 0.8);
    }
  }
}
</style>


