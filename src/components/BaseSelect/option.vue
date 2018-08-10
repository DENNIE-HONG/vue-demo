<template>
  <li :class="['com-option', {active: value === selected.value}]" :value="value" @click="onSelect">{{label}}</li>
</template>
<script>
export default {
  name: 'BaseOption',
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    label: {
      required: true,
      tyep: String
    }
  },
  created () {
    this.$on('defaultSelected', (data) => {
      this.selected = data;
    });
  },
  data () {
    return {
      selected: {
        name: '',
        value: ''
      }
    }
  },
  methods: {
    onSelect ($event) {
      // 向父组件通知
      this.selected.name = $event.target.textContent;
      this.selected.value = $event.target.__vue__.value;
      this.$parent.$options._componentTag === 'base-select' && this.$parent.$emit('selectChange', this.selected);
    }
  }
}
</script>
<style lang="scss">
.com-option {
  position: relative;
  padding: 0 rem(40);
  border-bottom: 1px solid nth($fgray, 1);
  text-align: left;
  &.active {
    &:after {
      position: absolute;
      top: 50%;
      right: rem(40);
      display: block;
      width: rem(20);
      height: rem(20);
      margin-top: rem(-20);
      content: '';
      border-radius: 50%;
      border: rem(10) solid white;
      box-shadow: 0 0 0 rem(3) nth($fblack, 3);
      background-color: nth($fgreen, 1);
    }
  }
}
</style>


