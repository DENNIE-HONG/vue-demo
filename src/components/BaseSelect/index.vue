<template>
  <div class="com-select" @click="close">
    <div class="com-select-btn" @click.stop="show">{{selected[0].name}}</div>
    <div class="com-select-box modal-bg black" :class="{hide: isHide}">
      <ul class="com-select-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number, Array],
    placeholder: {
      default: '请选择',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      isHide: true,
      selected: [{
        name: this.placeholder,
        value: ''
      }]
    }
  },
  created () {
    // 接受子组件option传递参数
    this.$on('selectChange', (data) => {
      this.isHide = true;
      if (data.value !== this.selected[0].value) {
        // this.selected = [];
        this.selected[0].value = data.value;
        this.selected[0].name = data.name;
        // this.selected.push(data);
        this.$emit('change', data.value);
      }
    });
  },
  mounted () {
    // 获取初始选中的option
    this.getSelected();
  },
  methods: {
    show () {
      this.isHide = false;
    },
    close ($event) {
      if ($event.target.className.includes('com-select')) {
        this.isHide = true;
      }
    },
    getSelected () {
      const value = Array.isArray(this.value) ? this.value: [this.value];
      for (let $child of this.$children) {
        if ($child.value === value[0]) {
          this.selected[0] = {
            name: $child.label,
            value: $child.value
          };
          const data = Object.assign({}, this.selected[0]);
          this.noticeChildrenSelected(data);
          break;
        }
      }
    },
    // 通知子组件初始选中值
    noticeChildrenSelected (data) {
      this.$children.map(($child) => {
        $child.$options._componentTag === 'base-option' && $child.$emit('defaultSelected', data);
      });
    }
  }
}
</script>
<style lang="scss">
.com-select {
  position: relative;
  height: rem(80);
  min-width: rem(300);
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
