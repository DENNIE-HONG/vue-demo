<template>
  <div class="home">
    <TheHead />
    <section>
      <div class="home-guess">
        <span class="line"></span>
        <h3 class="home-guess-txt"><i class="iconfont icon-search"></i>猜你喜欢</h3>
      </div>
      <product-list :productList="productList"/>
      <Loadmore :url="url" :success="loadSuccess" :params="sendData" ref="loadmore"/>
    </section>
    <TheFooter />
    <footer class="home-footer">
      <nav>
        <a class="active" href="javascript:;  "><i class="iconfont icon-home"></i><p class="footer-txt">首页</p></a>
        <router-link to="/my"><i class="iconfont icon-user"></i><p class="footer-txt">我的</p></router-link>
      </nav>
    </footer>
  </div>
</template>
<script>
import TheHead from 'coms/TheHead/index.vue';
import ProductList from 'coms/productList/index.vue';
import TheFooter from 'coms/layout/theFooter.vue';
import Loadmore from 'coms/loadmore/index.vue';
export default {
  name: 'Home',
  components: {
    TheHead,
    ProductList,
    TheFooter,
    Loadmore
  },
  metaInfo: {
    title: 'My Vue Home',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue练习首页'
      },
      {
        'property': 'description',
        'content': 'vue练习首页'
      }
    ]
  },
  data () {
    return {
      url: 'api/recommend.action',
      productList: [],
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
          this.$refs.loadmore.toEnd();
        }
      } else {
        this.$refs.loadmore.fail(res.statusText);
      }
    }
  }
}
</script>
<style lang="scss">
.home {
  &-guess {
    position: relative;
    background-color: white;
    text-align: center;
    .line {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      width: 50%;
      height: 1px;
      margin-left: -25%;
      background-color: nth($fgreen, 1);
    }
    &-txt {
      position: relative;
      display: inline-block;
      padding: 0 rem(25);
      background-color: white;
      z-index: 2;
      color: nth($fgreen, 1);
      > .iconfont {
        display: inline-block;
        font-size: rem(44);
        vertical-align: top;
      }
    }
  }
  &-footer {
    height: rem(90);
    border-top: 1px solid nth($fgray, 1);
    > nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      height: rem(90);
      justify-content: space-around;
      background-color: white;
    }
    a {
      text-align: center;
      color: nth($fblack, 2);
      &.active {
        color: nth($fgreen, 1);
      }
    }
    .footer-txt {
      margin-top: 0;
      line-height: 1;
    }
  }
}
</style>

