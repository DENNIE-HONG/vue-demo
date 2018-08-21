<template>
  <section
    v-if="productList.length"
    class="product-list">
    <dl class="product-list-box">
      <dd
        v-for="(list, index) in productList"
        :key="list.wareId + index"
        class="product-list-item">
        <template v-if="list.itemType == 0">
          <div class="product-list-pic"><img v-lazy="list.imageurl"/></div>
          <h4 class="product-list-title">{{list.wname}}</h4>
          <div class="product-list-info">
            <span>￥{{list.jdPrice}}</span>
          </div>
        </template>
        <div
          v-if="list.itemType == 1"
          class="product-list-shop">
          <div class="product-list-pic small"><img :src="list.imageurl"/></div>
          <h4 class="product-list-title">{{list.wname}}</h4>
          <span>{{list.followCount}}人关注</span>
        </div>
      </dd>
    </dl>
  </section>
</template>
<script>
/**
 * 商品列表模块
 * @param {Array} productList, 数据组
 * @author luyanhong 2018-08-15
 * @example
 * <product-list productLis="xxx"/>
*/
export default {
  name: 'ProductList',
  props: {
    productList: {
      default: [],
      type: Array
    }
  }
}
</script>
<style lang="scss">
.product-list {
  &-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &-item {
    width: 49%;
    margin-bottom: 2%;
    background-color: white;
  }
  &-pic {
    position: relative;
    height: rem(450);
    width: 100%;
    @include hid;
    &.small {
      width: 60%;
      height: auto;
      margin: rem(30) auto rem(20);
      > img {
        width: 100%;
      }
    }
    > img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-height: 100%;
      max-width: 100%;
    }
  }
  &-title {
    padding: 0 rem(10);
    margin: rem(15) 0;
    line-height: rem(36);
    @include linehid(2);
  }
  &-info {
    > span {
      color: nth($fred, 1);
    }
  }
  &-shop {
    text-align: center;
    > span {
      color: nth($fblack, 3);
    }
  }
}

</style>


