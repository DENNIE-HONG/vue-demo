<template>
  <div class="com-select">
    <div class="com-select-btn" @click="onChange">{{seleted}}</div>
    <div class="com-select-box modal-bg black" :class="{hide: isHide}">
      <ul class="com-select-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script>
import Bus from 'utils/bus.js';
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number]
  },
  data () {
    return {
      isHide: true,
      seleted: this.value
    }
  },
  watch: {
    seleted (val) {
      this.isHide = true;
      this.$emit('change', val);
    }
  },
  created () {
    console.log(this);
    Bus.$on('selectChange', (data) => {
      this.seleted = data.key;
    });
  },
  methods: {
    onChange () {
      this.isHide = false;
    }
  }
}
</script>
<style lang="scss">
.com-select {
  position: relative;
  height: rem(80);
  min-width: rem(200);
  &-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-btn {
    height: 100%;
  }
  &-list {
    width: 80%;
    border: 1px solid nth($fgray, 1);
    background-color: white;
    @include boxShadow;
    border-radius: rem(8);

  }
}

</style>


