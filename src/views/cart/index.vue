<template>
  <div class="cart">
    <header-banner>购物车</header-banner>
    <div class="cart-box">
      <section
        v-for="item of cartList"
        :key="item.cartRegionId"
        class="cart-list">
        <div class="title">
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
              :cart="li"></cart-item>
            </li>
            <!-- <li
              v-for="li in cart.cartGoodsList"
              class="cart-list-item"
              :key="li.cartId">
              <base-checkbox @change="changeGoods($event, li.currentPrice, li.cartId)"></base-checkbox>
              <div class="cart-list-item-box">
                <div class="cart-list-pic">
                  <img :src="li.imageUrl" />
                </div>
                <div class="cart-list-info">
                  <h5 class="cart-list-title">{{li.goodsName}}</h5>
                  <div class="pull-left">
                    <p class="cart-list-desc">{{li.skuDesc}}</p>
                    <b class="">￥{{li.currentPrice}}</b>
                  </div>
                  <div class="pull-right">
                    <input-number
                      :number="1"
                      :min="1"
                      :max="li.userLimitBuyCount ?li.userLimitBuyCount: li.maxSelectedStore"
                      @change=""
                      :ref="li.cartId">
                    </input-number>
                    <div class="cart-list-delete"><i class="iconfont icon-empty"></i></div>
                  </div>
                </div>
              </div>
            </li> -->
          </div>
          <li
            v-for="cart in item.cartItemList"
            :key="cart.cartGoods.cartId">
            <cart-item
            :cart="cart.cartGoods"
            ></cart-item>
          </li>
          <!-- <li
            v-for="cart in item.cartItemList"
            :key="cart.cartGoods.cartId"
            class="cart-list-item">
            <base-checkbox></base-checkbox>
            <div class="cart-list-item-box">
              <div class="cart-list-pic">
                <img :src="cart.cartGoods.imageUrl" />
              </div>
              <div class="cart-list-info">
                <h5 class="cart-list-title">{{cart.cartGoods.goodsName}}</h5>
                <div class="pull-left">
                  <p class="cart-list-desc">{{cart.cartGoods.skuDesc}}</p>
                  <b class="">￥{{cart.cartGoods.currentPrice}}</b>
                </div>
                <div class="pull-right">
                  <input-number
                    :number="1"
                    :min="1"
                    :max="cart.cartGoods.userLimitBuyCount? cart.cartGoods.userLimitBuyCount: cart.cartGoods.maxSelectedStore "></input-number>
                  <div class="cart-list-delete"><i class="iconfont icon-empty"></i></div>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
        <div class="cart-list-total global-clearfix">
          <span class="pull-right">本仓总计：￥0.00</span>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import InputNumber from 'coms/InputNumber';
import CartItem from 'coms/CartItem';
export default {
  name: 'Cart',
  components: {
    HeaderBanner,
    InputNumber,
    CartItem
  },
  data () {
    return {
      cartList: []
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
    changeGoods (checked, price, refId) {
      console.log(checked, price, refId);
      console.log(this.$refs[refId]);
    }
  }
}
</script>
<style lang="scss">
.cart {
  &-list {
    margin-bottom: rem(20);
    background-color: white;
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
    // &-pic {
    //   width: rem(150);
    //   margin-right: rem(20);
    //   min-width: rem(150);
    //   > img {
    //     width: 100%;
    //   }
    // }
    // &-info {
    //   width: 100%;
    //   @include hid;
    //   font-size: rem(24);
    // }
    // &-title {
    //   margin: 0;
    //   @include txthid;
    //   @include hid;
    // }
    // &-desc {
    //   margin: 0 0 rem(20);
    //   color: nth($fblack, 3);
    // }
    // &-delete {
    //   margin-top: rem(10);
    //   color: nth($fblack, 3);
    //   > .iconfont {
    //     font-size: rem(38);
    //   }
    // }
    &-total {
      padding: rem(20);
      font-size: rem(24);
    }
  }
}
</style>

