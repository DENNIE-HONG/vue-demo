<template>
  <div class="product page">
    <div class="content">
      <section
        v-show="isCommentSimple"
        class="product-content">
        <header-banner>
          <span class="product-tab iconfont">商品</span>
          <span class="product-tab iconfont">评价</span>
          <span class="product-tab iconfont">推荐</span>
        </header-banner>
        <empty-list text="哈哈哈哈哈，抓不到数据啦" />
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
        />
      </section>
    </div>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from 'coms/Layout/TheFooter.vue';
import HeaderBanner from 'coms/HeaderBanner';
import CommentList from 'coms/CommentList';
import EmptyList from 'coms/EmptyList';
export default {
  name: 'Product',
  components: {
    TheFooter,
    HeaderBanner,
    CommentList,
    EmptyList
  },
  data () {
    return {
      isCommentSimple: true
    }
  },
  created () {
  },
  methods: {
    /**
     * 评论切换是否查看更多
    */
    showComment (isCommentSimple) {
      this.isCommentSimple = isCommentSimple;
    }
  }
}
</script>
<style lang="scss">
.product {
  &-content {
    margin-bottom: rem(15);
  }
  &-comment {
    .com-header-banner {
      position: sticky;
      top: 0;
    }
  }
  &-tab {
    margin-right: rem(35);
    &:last-child {
      margin-right: 0;
    }
    &:active,
    &:hover {
      color: red;
      &:before {
        content: "\e6c1"
      }
    }
  }
}
</style>

