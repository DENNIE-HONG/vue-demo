<template>
  <div class="com-basetab-pane">
    <div class="tab">{{label}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BaseTabsPane',
  props: {
    label: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    }
  },
  created () {
    // console.log(this);
  }
}
</script>

