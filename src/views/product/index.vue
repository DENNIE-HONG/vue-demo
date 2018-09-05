<template>
  <div class="product page">
    <div class="content">
      <section
        v-show="isCommentSimple"
        class="product-content">
        <header-banner>
          <span
            :class="['product-tab', 'iconfont', {active: tabType === 1}]"
            @click="switchTab('.com-empty', 1)"
            >商品</span>
          <span
            :class="['product-tab', 'iconfont', {active: tabType === 2}]"
            @click="switchTab('.product-comment', 2)">评价</span>
          <span class="product-tab iconfont">推荐</span>
        </header-banner>
        <empty-list text="哈哈哈哈哈，抓不到数据啦"/>
      </section>
      <section class="product-comment">
        <div
          v-show="!isCommentSimple"
          class="com-header-banner">
          <div
            @click="showComment(true)"
            class="header-go-back"><i class="iconfont icon-left"></i></div>
          <span class="com-header-banner-slot">商品评价</span>
        </div>
        <comment-list
          :isSimple="isCommentSimple"
          @showComment="showComment"
          :productId="productId"
        />
      </section>
      <section class="product-guess">
        <h4>猜你喜欢</h4>
        <broad-cast
          :broadcastList="broadcastList"/>
      </section>
    </div>
    <the-footer />
  </div>
</template>
<script>
import jsonp from 'jsonp';
import querystring from 'querystring';
import TheFooter from 'coms/Layout/TheFooter.vue';
import HeaderBanner from 'coms/HeaderBanner';
import CommentList from 'coms/CommentList';
import EmptyList from 'coms/EmptyList';
import BroadCast from 'coms/BroadCast';
export default {
  name: 'Product',
  metaInfo: {
    title: 'my pruduct',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue商品详情页'
      },
      {
        'property': 'description',
        'content': 'vue商品详情页'
      }
    ]
  },
  components: {
    TheFooter,
    HeaderBanner,
    CommentList,
    EmptyList,
    BroadCast
  },
  data () {
    return {
      isCommentSimple: true,
      tabType: 1,
      broadcastList: [],
      productId: this.$route.params.productId
    }
  },
  created () {
    this.fetchGuess();
  },
  methods: {
    /**
     * 评论切换是否查看更多
     * @param {Boolean} 是否是简单版
    */
    showComment (isCommentSimple) {
      this.isCommentSimple = isCommentSimple;
    },
    // 切换埋点
    switchTab (selector, tabType) {
      this.$el.querySelector(selector).scrollIntoView();
      this.tabType = tabType;
    },
    // 获取猜你喜欢数据
    fetchGuess () {
      const params = {
        sku: this.productId,
        pc: 30
      }
      const q = querystring.encode(params);
      jsonp(`https://wqcoss.jd.com/mcoss/reclike/getrecinfo?${q}`, { timeout: 8000 }, (err, res) => {
        if (err) {
          this.$message({
            type: 'error',
            message: '网络不给力，请稍后再试哦'
          });
          return;
        }
        this.broadcastList = res.data;
      });
    }
  }
}
</script>
<style lang="scss">
.product {
  .com-header-banner {
    position: sticky;
    top: 0;
  }
  &-content,
  &-comment {
    margin-bottom: rem(15);
  }
  &-tab {
    margin-right: rem(45);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: nth($fred, 1);
      &:before {
        content: "\e8ff";
      }
    }
  }
  &-guess {
    background-color: white;
    @include hid;
    h4 {
      margin: rem(20);
    }
  }
}
</style>
