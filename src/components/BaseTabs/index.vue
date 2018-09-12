<template>
  <div class="com-basetab">
    <div v-show="false"><slot></slot></div>
    <nav class="com-basetab-box">
      <li
        v-for="tab in tabs"
        class="tab">{{tab}}</li>
    </nav>
    <div class="com-basetab-content">
      <!-- <div v-for="item in slots">{item}</div> -->
    </div>

  </div>
</template>
<script>
// import Vue from 'vue';
// import BaseTabsPane from './BaseTabsPane';
export default {
  name: 'BaseTabs',
  data () {
    return {
      tabs: [],
      slots: []
    }
  },
  created () {
    console.log(this);
  },
  mounted () {
    this.getTabs();
  },
  methods: {
    getTabs () {
      this.$children.map((child) => {
        console.log(child);
        this.tabs.push(child.label);
        this.slots.push(child.$slots.default);
        // new Vue({
        //   el: this.$refs.content,
        //   render (createElement) {
        //     return createElement('div', child.$slots.default)
        //   }
        // });
        // Vue.component('BaseTabsPane', {
        //   render (h) {
        //     const tag = 'div';
        //     return h(tag, child.$slots.default);
        //   }
        //   // props: {
        //   //   name: '1',
        //   //   label: '1'
        //   // }
        // });
      });
    }
  }
  // render (h) {
  //   const { tab } = this;
  //   return h('div', {
  //     'class': 'com-basetab-box'
  //   }, [h('nav')]);

  // const header = (
  //   <nav class="com-basetab-box">
  //     <li
  //       v-for="tab in tabs"
  //       class="tab">{{ tab }}</li>
  //   </nav>
  // );
  // const panels = (
  //   <div class="com-basetab-content">
  //     2
  //   </div>
  // );
  // return (
  //   <div class="com-basetab">{[header, panels]}</div>
  // );
  // }
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
    }
  }
}
</style>


