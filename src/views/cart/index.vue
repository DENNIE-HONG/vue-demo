<template>
  <div class="cart">
    <header-banner>购物车</header-banner>
    <div class="cart-box">
      <section
        v-for="item of cartList"
        :key="item.cartRegionId"
        class="cart-list">
        <cart-item-group
          :list="item"></cart-item-group>
        <!-- <div class="title">
          <base-checkbox></base-checkbox>
          <i class="iconfont icon-home"></i>{{item.goodsSource}}</div>
        <ul>
          <div
            v-if="item.cartActivityGoodsList.length"
            v-for="cart in item.cartActivityGoodsList">
            <li
              v-for="li in cart.cartGoodsList"
              :key="li.cartId">
              <cart-item
                :cart="li"
                @checked="changeGoods($event, )"></cart-item>
            </li>
          </div>
          <li
            v-for="cart in item.cartItemList"
            :key="cart.cartGoods.cartId">
            <cart-item
              :cart="cart.cartGoods"
              @checked="changeGoods"
            ></cart-item>
          </li>
        </ul>
        <div class="cart-list-total global-clearfix">
          <span class="pull-right">本仓总计：￥0.00</span>
        </div> -->
      </section>
    </div>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import InputNumber from 'coms/InputNumber';
import CartItemGroup from 'coms/CartItem/CartItemGroup';
// import CartItem from 'coms/CartItem';
export default {
  name: 'Cart',
  components: {
    HeaderBanner,
    InputNumber,
    CartItemGroup
  },
  data () {
    return {
      cartList: [],
      total1: 0.00,
      total2: 0.00
    }
  },
  created () {
    this.$api['kaola/cart']({}).then((res) => {
      console.dir(res);
      if (res.status === 200) {
        this.cartList = res.data.cartShow.cartRegionList;
      } else {
        this.$message({
          type: 'error',
          message: res.statusText
        });
      }
    }).catch((err) => {
      this.$message({
        type: 'error',
        message: err
      });
    });
  },
  methods: {
    // 商品checkbox事件
    changeGoods (total) {
      console.log(total);
    }
  }
}
</script>
<style lang="scss">
.cart {
  // &-list {
  //   margin-bottom: rem(20);
  //   background-color: white;
  //   &-item {
  //     display: flex;
  //     padding: rem(20);
  //     .pull-right {
  //       margin-top: rem(15);
  //       text-align: right;
  //     }
  //     &-box {
  //       display: flex;
  //       @include hid;
  //       flex: 1;
  //       border-bottom: 1px solid nth($fgray, 1);
  //     }
  //     .com-checkbox {
  //       display: flex;
  //       align-items: center;
  //       margin-right: rem(40);
  //     }
  //   }
  //   &-total {
  //     padding: rem(20);
  //     font-size: rem(24);
  //   }
  // }
}
</style>

