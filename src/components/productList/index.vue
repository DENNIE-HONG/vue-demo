<template>
  <section class="product-list">
    <dl class="product-list-box">
      <dd class="product-list-item" v-for="(list, index) in productList" :key="list.wareId + index">
        <template v-if="list.itemType == 0">
          <div class="product-list-pic"><img v-lazy="list.imageurl"/></div>
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
    <Loadmore :url="getProductUrl" :success="loadSuccess" :params="sendData" ref="loadmore"/>
  </section>
</template>
<script>
import Loadmore from 'coms/loadmore/index.vue';
import { debounce } from 'throttle-debounce';
import scrollBottom from 'utils/scroll-bottom.js';
import loadingImg from 'assets/img/loading.gif';
/**
 * 商品列表模块
 * @param {String}  getProductUrl, 请求数据url
 * @author luyanhong 2018-08-15
 * @example
 * <product-list />
*/
export default {
  name: 'ProductList',
  components: {
    Loadmore
  },
  props: {
    getProductUrl: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      productList: [],
      sendData: {
        page: 1
      },
      img: loadingImg
    }
  },
  created () {
    const debounceScroll = debounce(300, this.scrollToBottomLoading.bind(this));
    window.addEventListener('scroll', debounceScroll);
  },
  methods: {
    loadSuccess (res) {
      if (res.status === 200) {
        const result = JSON.parse(res.data.recommend);
        if (result.wareInfoList.length) {
          this.productList = this.productList.concat(result.wareInfoList);
          this.sendData.page += 1;
        } else {
          this.$refs.loadmore.toEnd();
        }
      } else {
        this.$refs.loadmore.fail(res.statusText);
      }
    },
    // 触底加载事件
    scrollToBottomLoading () {
      if (scrollBottom(window, 30)) {
        this.sendData.page % 3 !== 0 && this.$refs.loadmore.loadmore();
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


