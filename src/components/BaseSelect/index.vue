<template>
  <div class="com-select" @click="close">
    <div class="com-select-btn" @click.stop="show">
      <span v-if="!multiple">{{selectedNames.length ? selectedNames[0]: placeholder}}</span>
      <span v-if="multiple" class="tag" v-for="tag in selectedNames">{{tag}}</span>
    </div>
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
      selected: new Map(),
      selectedNames: []
    }
  },
  created () {
    // 接受子组件option传递参数, 当前选中对象，{Object}
    this.$on('selectChange', (data) => {
      this.isHide = true;
      if (!this.selected.has(data.name)) {
        // 多选情况
        if (this.multiple) {
          this.selected.set(data.name, data.value);
          this.$emit('change', this.selectedNames);
        } else {
          this.selected.clear();
          this.selected.set(data.name, data.value);
          this.$emit('change', data.value);
        }
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
      let valueArr = Array.isArray(this.value) ? this.value: [this.value];
      if (!this.multiple && valueArr.length > 1) {
        [valueArr] = valueArr;
      }
      valueArr.map((value) => {
        for (let $child of this.$children) {
          if ($child.value === value) {
            this.selected.set($child.label, $child.value);
            break;
          }
        }
      });
      this.selectedNames = [...this.selected.keys()];
      this.noticeChildrenSelected(this.selectedNames);
    },
    /**
     * 通知子组件初始选中值
     * @param {Array}  选中选项数组
    */
    noticeChildrenSelected (selectedArr) {
      this.$children.map(($child) => {
        $child.$options._componentTag === 'base-option' && $child.$emit('defaultSelected', selectedArr);
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
