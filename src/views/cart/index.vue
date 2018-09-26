<template>
  <div class="cart">
    <header-banner>购物车</header-banner>
    <div class="cart-box">
      <section
        v-for="item of cartList"
        :key="item.cartRegionId"
        class="cart-list">
        <cart-item-group
          :list="item"
          ref="cartGroup"
          @change="changeWareHouse(arguments, item.cartRegionId)"></cart-item-group>
      </section>
    </div>
    <div class="cart-settlement">
      <base-checkbox
        v-model="allSelected"
        @change="changeAll">全选</base-checkbox>
      <div class="pull-right">
        <span>总价：￥{{total.toFixed(2)}}</span>
        <div class="cart-settlement-btn">结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import InputNumber from 'coms/InputNumber';
import CartItemGroup from 'coms/CartItem/CartItemGroup';
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
      allSelected: false,
      selectedSet: new Map(),
      total: 0
    }
  },
  computed: {
    wareHouseSize () {
      return this.cartList.length;
    }
  },
  created () {
    this.$api['kaola/cart']({}).then((res) => {
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
    // 是否全选事件
    changeAll (checked) {
      this.$refs.cartGroup.map((ref)=> {
        checked !== ref.allChecked && ref.$refs.checkbox.$el.click();
      });
    },
    /**
     * 每个仓库选中事件
     * @param {checked} args[0], 是否选中
     * @param {Number}  args[1], 本仓库总额
    */
    changeWareHouse (args, id) {
      const [checked, total] = args;
      console.log(total);
      checked && this.selectedSet.set(id, total);
      !checked && this.selectedSet.delete(id);
      if (this.selectedSet.size === this.wareHouseSize) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
      console.log(this.selectedSet);
      let all = 0;
      this.selectedSet.forEach((value, key) => {
        console.log(value, key);
        all += value;
      });
      this.total = all;
    }
  }
}
</script>
<style lang="scss">
.cart {
  &-settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    border-top: 2px solid nth($fgray, 1);
    &-btn {
      display: inline-block;
      width: rem(150);
      height: rem(100);
      text-align: center;
      background-color: nth($fgray, 2);
      line-height: rem(100);
    }
  }
}
</style>
