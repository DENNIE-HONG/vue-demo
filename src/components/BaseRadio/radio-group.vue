<template>
  <div class="com-radio-group modal-bg black">
    <div class="com-radio-box">
      <h3>{{title}}</h3>
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * 单选组模块
 * @author luyanhong 2018-08-06
*/
export default {
  name: 'BaseRadioGroup',
  modal: {
    prop: 'value',
    event: 'change'
  },
  props: {
    title: {
      default: '请选择',
      type: String
    },

    value: [String, Number]
  },
  watch: {
    value (val) {
      console.log(val);
    }
  },
  created () {
    this.$on('handleChange', (value) => {
      this.$emit('change', value);
    });
  },
  methods: {
    test () {
      console.log(2);
    }
  }
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


