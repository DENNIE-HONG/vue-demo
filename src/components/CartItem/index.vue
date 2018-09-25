<template>
  <div
    class="cart-list-item">
    <base-checkbox
      :checked="selected"
      @change="changeGood($event, cart.currentPrice)"
      ref="checkbox"></base-checkbox>
    <div class="cart-list-item-box">
      <div class="cart-list-pic">
        <img :src="cart.imageUrl" />
      </div>
      <div class="cart-list-info">
        <h5 class="cart-list-title">{{cart.goodsName}}</h5>
        <div class="pull-left">
          <p class="cart-list-desc">{{cart.skuDesc}}</p>
          <b class="">￥{{cart.currentPrice}}</b>
        </div>
        <div class="pull-right">
          <input-number
            v-model="cartCount"
            :min="1"
            :max="cart.userLimitBuyCount? cart.userLimitBuyCount: cart.maxSelectedStore "></input-number>
          <div class="cart-list-delete"><i class="iconfont icon-empty"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 购物车单项
 * @param {Object}   cart，数据
 * @param {function} checked, 选中商品事件
 * @param {Boolean}  selected, 是否选中，默认否
 * @author luyanhong 2018-09-25
 * @example
 * <cart-item cart={}></cart-item>
 *
*/
import InputNumber from 'coms/InputNumber';
export default {
  name: 'CartItem',
  props: {
    cart: {
      default: {},
      type: Object
    },
    selected: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      cartCount: 1
    }
  },
  components: {
    InputNumber
  },
  methods: {
    // 是否选中商品事件
    changeGood (checked, price) {
      const total = price * this.cartCount
      this.$emit('checked', checked, total);
    }
  }
}
</script>
<style lang="scss">
.cart-list {
  &-item {
    display: flex;
    padding: rem(20);
    .pull-right {
      margin-top: rem(15);
      text-align: right;
    }
    &-box {
      display: flex;
      @include hid;
      flex: 1;
      border-bottom: 1px solid nth($fgray, 1);
    }
    .com-checkbox {
      display: flex;
      align-items: center;
      margin-right: rem(40);
    }
  }
  &-pic {
    width: rem(150);
    margin-right: rem(20);
    min-width: rem(150);
    > img {
      width: 100%;
    }
  }
  &-info {
    width: 100%;
    @include hid;
    font-size: rem(24);
  }
  &-title {
    margin: 0;
    @include txthid;
    @include hid;
  }
  &-desc {
    margin: 0 0 rem(20);
    color: nth($fblack, 3);
  }
  &-delete {
    margin-top: rem(10);
    color: nth($fblack, 3);
    > .iconfont {
      font-size: rem(38);
    }
  }
}
</style>


