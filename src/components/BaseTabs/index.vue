<template>
  <div class="com-basetab">
    <nav class="com-basetab-box">
      <li
        v-for="tab in tabs"
        :class="['tab', { active: tab.name === activeName }]"
        @click="changeTab(tab.name)">{{tab.label}}</li>
    </nav>
    <div class="com-basetab-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * tabs页
 * @param {String}   activeName, 当前默认tab
 * @author luyanhong 2018-09-17
 * @example
 * <base-tabs>
 *  <base-tabs-pane name="1" label="1">我是一</base-tabs-pane>
 * </base-tabs>
*/
// import Vue from 'vue';
export default {
  name: 'BaseTabs',
  model: {
    prop: 'activeName',
    event: 'tab-change'
  },
  props: {
    activeName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tabs: [],
      name: this.activeName
    }
  },
  mounted () {
    this.getTabs();
  },
  methods: {
    getTabs () {
      this.$children.map((child) => {
        const data = {
          name: child.name,
          label: child.label,
          panels: child.$slots.default
        };
        this.tabs.push(data);
      });
    },
    // 标签切换
    changeTab (activeName) {
      this.$emit('tab-change', activeName);
      this.name = activeName;
    }
  }
}
</script>
<style lang="scss">
.com-basetab {
  background-color: white;
  &-box {
    height: rem(90);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab {
      padding: rem(15) 0;
      flex: 1;
      border-right: 1px solid nth($fgray, 1);
      &.active {
        color: nth($fgreen, 1);
      }
    }
  }
}
</style>


