<template>
  <div class="cart">
    <header-banner>购物车</header-banner>
    <div class="cart-box">
      <section
        v-for="item of cartList"
        :key="item.cartRegionId"
        class="cart-list">
        <div class="title"><i class="iconfont icon-home"></i>{{item.goodsSource}}</div>
        <ul>
          <li
            v-for="cart in item.cartItemList"
            :key="cart.cartGoods.cartId"
            class="cart-list-item">
            <div class="cart-list-pic">
              <img :src="cart.cartGoods.imageUrl" />
            </div>
            <div class="cart-list-info">
              <h5 class="cart-list-title">{{cart.cartGoods.goodsName}}</h5>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
export default {
  name: 'Cart',
  components: {
    HeaderBanner
  },
  data () {
    return {
      cartList: []
    }
  },
  created () {
    this.$api['kaola/cart']({}).then((res) => {
      console.log(res);
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
    }
    &-pic {
      // display: inline-block;
      width: rem(150);
      margin-right: rem(20);
      min-width: rem(150);
      > img {
        width: 100%;
      }
    }
    &-info {
      // display: inline-block;
    }
  }
}
</style>


