<template>
  <label class="com-radio">
    <span><slot></slot></span>
    <input type="radio" class="com-radio-input" :name="name" :value="label" @input="onChange" :checked="value === label" />
  </label>
</template>
<script>
/**
 * 单选框
 * @param label   必须, {String|Number} 选中radio代表的值
 * @param name    可选, {String}
 * @author luyanhong 2018-08-06
*/
export default {
  name: 'BaseRadio',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      default: 'radio',
      type: String
    },
    label: {
      default: '',
      type: [String, Number],
      required: true
    },

    value: {
      type: [String, Number]
    }
  },
  methods: {
    onChange ($event) {
      const value = $event.target._value;
      this.$emit('change', value);
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
    // opacity: 0;
  }
}
</style>
