<template>
  <div class="com-broadcast">
    <v-touch
      ref="swiper"
      class="com-broadcast-list"
      tag="ul"
      @swipeleft="swipeLeft"
      @swiperight="swipeRight">
      <li
        v-for="(item, i) in broadcastList"
        :key="item.sku"
        class="com-broadcast-item">
        <div class="pic">
          <img :src="'//img14.360buyimg.com/mobilecms/s270x270_'+ item.img">
        </div>
        <h5 class="com-broadcast-title">{{item.t}}</h5>
        <span class="com-broadcast-price">{{(item.jp/100).toFixed(2)}}{{'--'+i}}</span>
      </li>
    </v-touch>
    <div class="com-broadcast-page">{{index}}</div>
  </div>
</template>
<script>
export default {
  name: 'BroadCast',
  props: {
    broadcastList: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
      index: 1
    }
  },
  watch: {
    index (val) {
      console.log(val);
    }
  },
  computed: {
    total () {
      return this.broadcastList.length;
    }
  },
  methods: {
    // 向左滑动
    swipeLeft () {
      if (this.index === this.total) {
        return;
      }
      this.index += 1;
    },
    // 向右滑动
    swipeRight () {
      if (this.index === 1) {
        return;
      }
      this.index -= 1;
    },
    // 根据index设置滚动距离
    setTransform (index) {
      const translateX = -1 / this.total * (index - 1) * 100;
      this.$refs.swiper.$el.style.transform = `translateX(${translateX}%)`;
    }
  }
}
</script>
<style lang="scss">
.com-broadcast {
  width: 100%;
  @include hid;
  &-list {
    width: 500%;
    height: 200%;
  }
  &-item {
    float: left;
    width: 6.66%;
    border-right: 1px solid nth($fgray, 1);
    border-bottom: 1px solid nth($fgray, 1);
    box-sizing: border-box;
    .pic {
      position: relative;
      width: 100%;
      padding-top: 100%;
      > img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  &-title {
    margin: rem(10) rem(20) rem(5);
    @include linehid(2);
    line-height: rem(30);
    font-size: rem(24);
  }
  &-price {
    padding-left: rem(20);
    color: nth($fred, 1);
  }
}
</style>

