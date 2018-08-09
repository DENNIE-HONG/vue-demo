<template>
  <li class="com-option" :value="value" @click="onSelect">{{label}}</li>
</template>
<script>
import Bus from 'utils/bus.js';
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
  methods: {
    onSelect ($event) {
      // 向父组件通知
      const data = {
        key: $event.target.textContent,
        value: $event.target.value
      }
      Bus.$emit('selectChange', data);
    }
  }
}
</script>

