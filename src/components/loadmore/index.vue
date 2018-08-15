<template>
  <div class="com-loadmore">
    <div v-if="state === 0" @click="loadmore">点击加载更多</div>
    <div v-if="state === 1" class="com-loadmore-loading">拼命加载中...</div>
    <div v-if="state === 2" class="com-loadmore-end"><span>我也是有底线的</span></div>
    <span v-if="state === 3">加载失败</span>
  </div>
</template>
<script>
/**
 * 加载更多模块
 * @param {String}      url，加载资源url
 * @param {Function}    success, 加载成功后事件
 * @param {Object}      params, 请求传送数据
 * @param {Boolean}     isImmediateLoad, 是否立马加载数据，默认是
 * @author luyanhong 2018-08-15
 * @example
 * <Loadmore url="xxx" success="function" params="{}" />
*/
const READY = 0; // 准备
const LOADING = 1; // 加载中动画
const END = 2; // 加载到底了
const FAIL = 3; // 加载失败
import message from 'coms/message/message.js';
const required = () => {
  throw Error('missing parameter error!');
}
export default {
  name: 'Loadmore',
  props: {
    url: {
      required: true,
      type: String
    },
    success: {
      required: true,
      type: Function
    },
    params: Object,
    isImmediateLoad: {
      default: true,
      type: Boolean
    }
  },
  created () {
    this.isImmediateLoad && this.loadmore();
  },
  data () {
    return {
      state: READY
    }
  },
  methods: {
    /**
     * 点击加载更多
    */
    loadmore () {
      this.state = LOADING;
      this.$api[this.url](this.params).then((res)=> {
        this.state = READY;
        this.success(res);
      }).catch(() => {
        this.fail('网络不给力，请稍后再试哦');
      });
    },
    /**
     * 加载失败
     * @param {String}  error, 失败信息
    */
    fail (error = required()) {
      this.state = FAIL;
      message({
        type: 'error',
        message: error
      });
    },
    // 加载到底了
    toEnd () {
      this.state = END;
    }
  }
}
</script>
<style lang="scss">
.com-loadmore {
  height: rem(80);
  text-align: center;
  border-top: 1px solid nth($fgray, 1);
  border-bottom: 1px solid nth($fgray, 1);
  background-color: white;
  color: nth($fblack, 3);
  line-height: rem(80);
  &-end {
    width: 60%;
    margin: rem(40) auto 0;
    border-top: 1px solid nth($fblack, 3);
    > span {
      display: inline-block;
      position: relative;
      top: rem(-25);
      width: 55%;
      background-color: white;
    }
  }
  &-loading {
    &:before {
      display: inline-block;
      width: rem(40);
      height: rem(40);
      margin-right: rem(10);
      margin-top: rem(20);
      content: '';
      background: url('./img/loading.gif') top/100% no-repeat;
      vertical-align: top;
    }
  }
}
</style>


