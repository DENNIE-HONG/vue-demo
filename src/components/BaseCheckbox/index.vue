<template>
  <label class="com-checkbox">
    <input type="checkbox" class="com-checkbox-input" :checked="checked" @change="$emit('change', $event.target.checked)"/>
    <div class="com-checkbox-box"><i class="checked"></i></div>
    <span class="com-checkbox-txt"><slot></slot></span>
  </label>
</template>
<script>
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  }
}
</script>
<style lang="scss">
.com-checkbox {
  display: inline-block;
  line-height: rem(30);
  &-input {
    display: none;
  }
  &-input:checked {
    & + .com-checkbox-box {
      background-color: nth($fgreen, 1);
      .checked {
        display: block;
      }
    }
  }
  &-box {
    display: inline-block;
    width: rem(28);
    height: rem(28);
    border: 1px solid nth($fgreen, 1);
    text-align: center;
    @include hid;
    .checked {
      display: none;
      color: white;
      font-size: rem(24);
      line-height: rem(28);
      &:after {
        display: block;
        content: '\2713';
      }
    }
  }
  &-txt {
    display: inline-block;
    line-height: rem(28);
    vertical-align: top;
  }
}

</style>


