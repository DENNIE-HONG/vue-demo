<template>
  <div class="com-comment">
    <div
      class="com-comment-type"
      @click="changeScore($event)">
      <div
        :class="['com-comment-tag', 'tag-default', {active :sendData.score === 0}]"
        data-score="0">全部{{summary.CommentCountStr}}</div>
      <div
        :class="['com-comment-tag', 'tag-default', {active :sendData.score === 3}]"
        data-score="3">好评{{summary.GoodCountStr}}</div>
      <div
        :class="['com-comment-tag', 'tag-default', {active :sendData.score === 2}]"
        data-score="2"
        >中评{{summary.GeneralCountStr}}</div>
      <div
        :class="['com-comment-tag', 'tag-default', {active :sendData.score === 1}]"
        data-score="1"
        >差评{{summary.PoorCountStr}}</div>
    </div>
    <ul class="com-comment-list">
      <li
        v-for="item in commentList"
        class="com-comment-item">
        <div class="com-comment-info">
          <span class="com-comment-name">{{item.nickname}}</span>
          <div class="com-comment-time pull-right">{{item.referenceTime}}</div>
        </div>
        <p class="com-comment-detail">{{item.content}}</p>
        <div
          v-if="item.imageCount"
          class="com-comment-pics">
          <div
            v-for="img in item.images"
            class="com-comment-pic pull-left">
            <img :src="img.imgUrl + '!cc_100x100.dpg'"/>
          </div>
        </div>
      </li>
      <load-more url="https://wq.jd.com/commodity/comment/getcommentlist" :success="loadSuccess" :params="sendData" jsonp ref="loadmore"/>
    </ul>
  </div>
</template>
<script>
import LoadMore from 'coms/LoadMore';
export default {
  name: 'CommentList',
  components: {
    LoadMore
  },
  data () {
    return {
      commentList: [],
      sendData: {
        sorttype: 5,
        sku: this.$route.params.productId,
        page: 1,
        score: 0
      },
      summary: {},
      type: ''
    }
  },
  watch: {
    'sendData.score' () {
      this.$refs.loadmore.loadmore();
    }
  },
  methods: {
    loadSuccess (res) {
      if (res.errcode === '0') {
        this.commentList = res.result.comments;
        this.summary = res.result.productCommentSummary;
      }
    },
    changeScore ($event) {
      const { score } = $event.target.dataset;
      score && (this.sendData.score = parseInt(score));
    }
  }
}
</script>
<style lang="scss">
.com-comment {
  background-color: white;
  padding: 0 rem(20);
  &-item {
    padding: rem(20) 0;
    border-bottom: 1px solid nth($fgray, 1);
    font-size: rem(24);
  }
  &-name,
  &-time {
    color: nth($fblack, 3);
  }
  &-pics {
    @include hid;
  }
  &-pic {
    width: rem(140);
    height: rem(140);
    margin-right: rem(10);
    margin-bottom: rem(10);
    @include hid;
    > img {
      max-width: 100%;
      max-width: 100%;
      width: auto;
    }
  }
  &-tag {
    font-size: rem(24);
    &.active {
      background-color: nth($fgreen, 1);
      color: white;
    }
  }
}
</style>
