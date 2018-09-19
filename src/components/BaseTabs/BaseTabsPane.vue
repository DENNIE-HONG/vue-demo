<template>
  <div
    v-show="isShow"
    class="com-basetab-pane">
    <slot></slot>
  </div>
</template>
<script>
/**
 * tabs页面板
 * @param {String}  tab文案，必须
 * @param {String}  name，必须
 * @author luyanhong 2018-09-19
 * @example
 * <base-tabs-pane label="标签" name="tab"></base-tabs-pane>
*/
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
  computed: {
    isGroup () {
      if (this.$parent && this.$parent.$options._componentTag === 'base-tabs') {
        return true;
      }
      return false;
    },
    isShow () {
      return this.isGroup && this.$parent.name === this.name;
    }
  }
}
</script>

