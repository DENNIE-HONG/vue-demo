<template>
  <section class="product-list">
    <dl class="product-list-box">
      <dd class="product-list-item" v-for="(list, index) in productList" :key="list.wareId + index">
        <template v-if="list.itemType == 0">
          <div class="product-list-pic"><img :src="list.imageurl"/></div>
          <h4 class="product-list-title">{{list.wname}}</h4>
          <div class="product-list-info">
            <span>￥{{list.jdPrice}}</span>
          </div>
        </template>
        <div v-if="list.itemType == 1" class="product-list-shop">
          <div class="product-list-pic small"><img :src="list.imageurl"/></div>
          <h4 class="product-list-title">{{list.wname}}</h4>
          <span>{{list.followCount}}人关注</span>
        </div>
      </dd>
    </dl>
    <Loadmore :url="getProductUrl" :success="loadSuccess" :params="sendData"/>
  </section>
</template>
<script>
import Loadmore from 'coms/loadmore/index.vue';
/**
 * 商品列表模块
 * @author luyanhong 2018-08-15
 * @example
 * <product-list />
*/
export default {
  name: 'ProductList',
  components: {
    Loadmore
  },
  data () {
    return {
      productList: [],
      getProductUrl: 'api/recommend.action',
      sendData: {
        page: 1
      }
    }
  },
  methods: {
    loadSuccess (res) {
      if (res.status === 200) {
        const result = JSON.parse(res.data.recommend);
        if (result.wareInfoList.length) {
          this.productList = this.productList.concat(result.wareInfoList);
          this.sendData.page += 1;
        } else {
          this.$children[0].toEnd();
        }
      } else {
        this.$children[0].fail(res.statusText);
      }
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
    height: rem(500);
    width: 49%;
    margin-bottom: 2%;
    background-color: white;
  }
  &-pic {
    height: rem(350);
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
      height: 100%;
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


