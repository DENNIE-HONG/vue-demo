<template>
  <div :class="['com-comment', {active: !simple}]">
    <div class="com-comment-tab">
      <template v-if="simple">
        评价
        <span class="tab-good-score">好评{{summary.GoodRateShow}}%</span>
        <div
          class="pull-right"
          @click="checkMore">共 {{summary.CommentCountStr}} 条<i class="iconfont icon-right"></i></div>
      </template>
      <template v-else>
        <base-checkbox v-model="onlyCurrent">只看当前商品</base-checkbox>
        <div class="pull-right">好评度{{summary.GoodRateShow}}%</div>
      </template>
    </div>
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
        v-for="(item,index) in commentList"
        v-show="(simple && index < 2) || !simple"
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
    </ul>
    <load-more
        url="https://wq.jd.com/commodity/comment/getcommentlist" :success="loadSuccess"
        :params="sendData"
        jsonp
        ref="loadmore"
        :class="{hide: simple}"
      />
    <div
      v-if="simple"
      class="com-comment-more">
      <div
        class="btn-default"
        @click="checkMore">查看全部评价<i class="iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import LoadMore from 'coms/LoadMore';
import BaseCheckbox from 'coms/BaseCheckbox';
export default {
  name: 'CommentList',
  components: {
    LoadMore,
    BaseCheckbox
  },
  data () {
    return {
      commentList: [],
      sendData: {
        sorttype: 5,
        sku: this.$route.params.productId,
        page: 1,
        score: 0,
        pagesize: 10
      },
      summary: '',
      type: '',
      simple: true,
      onlyCurrent: false
    }
  },
  watch: {
    'sendData.score' () {
      this.reload();
    },
    onlyCurrent (checked) {
      if (checked) {
        this.$set(this.sendData, 'skucomment', 1);
      } else {
        delete this.sendData['skucomment'];
      }
      this.reload();
    }
  },
  methods: {
    loadSuccess (res) {
      if (res.errcode !== '0') {
        this.$refs.loadmore.fail(res.errmsg);
        return;
      }
      if (res.result.comments.length) {
        this.commentList = this.commentList.concat(res.result.comments);
        this.summary = res.result.productCommentSummary;
        this.sendData.page += 1;
      } else {
        this.$refs.loadmore.toEnd();
      }
    },
    changeScore ($event) {
      const { score } = $event.target.dataset;
      score && (this.sendData.score = parseInt(score));
      this.checkMore();
    },
    checkMore () {
      this.simple = false;
    },
    reload () {
      this.commentList = [];
      this.sendData.page = 1;
      this.$refs.loadmore.loadmore();
    }
  }
}
</script>
<style lang="scss">
.com-comment {
  background-color: white;
  &-tab {
    padding: rem(20);
    border-bottom: 1px solid nth($fgray, 1);
    font-size: rem(28);
    .tab-good-score {
      padding-left: rem(5);
      color: nth($fred, 1);
      font-size: rem(24);
    }
    .pull-right {
      display: flex;
      color: nth($fblack, 2);
      font-size: rem(24);
    }
  }
  &-list {
    padding: 0 rem(20);
  }
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
  &-type {
    padding-left: rem(20);
  }
  &-tag {
    margin-top: rem(20);
    font-size: rem(24);
    &.active {
      background-color: nth($fgreen, 1);
      color: white;
    }
  }
  &-more {
    padding: rem(18) 0;
    text-align: center;
  }
  &.active {


  }
}
</style>
