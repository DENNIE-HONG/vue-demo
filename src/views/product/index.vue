<template>
  <div class="product">
    <header-banner v-show="isCommentSimple">
      <span
        :class="['product-tab', 'iconfont', {active: tabType === 1}]"
        @click="switchTab('.com-empty', 1)"
        >商品</span>
      <span
        :class="['product-tab', 'iconfont', {active: tabType === 2}]"
        @click="switchTab('.product-comment', 2)">评价</span>
      <span
        :class="['product-tab', 'iconfont', {active: tabType === 3}]"
        @click="switchTab('.product-guess', 3)">推荐</span>
    </header-banner>
    <section
      v-show="isCommentSimple"
      class="product-content">
      <empty-list text="哈哈哈哈哈，抓不到数据啦"/>
    </section>
    <section class="product-comment">
      <comment-list
        :isSimple="isCommentSimple"
        @showComment="showComment"
        :productId="productId"
      />
    </section>
    <section
      v-if="questionList.length"
      v-show="isCommentSimple"
      class="product-question">
      <h4 class="title">
        问答专区
        <router-link
          class="pull-right"
          :to="'/question/' + productId">查看全部问答<i class="iconfont icon-right"></i></router-link>
      </h4>
      <ul class="question-list">
        <li
          v-for="item in questionList"
          :key="item.id"
          class="question-list-item">
          <span class="txt"><i class="iconfont icon-ask"></i>{{item.content}}</span>
          <div class="pull-right">共{{item.answerCount}}个回答</div>
        </li>
      </ul>
    </section>
    <section
      v-show="isCommentSimple"
      class="product-guess">
      <h4 class="title">猜你喜欢</h4>
      <broad-cast
        :broadcastList="broadcastList"/>
    </section>
    <section class="product-specifications">
      <base-tabs v-model="activeName">
        <base-tabs-pane label="商品介绍" name="detail">哈哈，我是详情</base-tabs-pane>
        <base-tabs-pane label="规格参数" name="specification">
          <div class="product-title-line"><span>规格参数</span></div>
          <base-table
            :list="specification"
            class="product-table">
            <base-table-column prop="attName"></base-table-column>
            <base-table-column prop="vals"></base-table-column>
          </base-table>
        </base-tabs-pane>
      </base-tabs>
    </section>
  </div>
</template>
<script>
import jsonp from 'jsonp';
import querystring from 'querystring';
import HeaderBanner from 'coms/HeaderBanner';
import CommentList from 'coms/CommentList';
import EmptyList from 'coms/EmptyList';
import BroadCast from 'coms/BroadCast';
const GET_GUESS_URL = 'https://wqcoss.jd.com/mcoss/reclike/getrecinfo';
const GET_QUESTION_URL = 'https://wq.jd.com/questionanswer/GetSkuQuestionListWeChat';
// const GET_SHOP_URL = 'https://wq.jd.com/mshop/BatchGetShopInfoByVenderId';
const GET_SPECIFICATION_URL = 'https://wq.jd.com/commodity/itembranch/getspecification';
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
      productId: this.$route.params.productId,
      questionList: [],
      activeName: 'specification',
      specification: []
    }
  },
  created () {
    this.fetchGuess();
    this.fetchQuestion();
    this.fetchSpecification();
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
      this.fetchJsonp(GET_GUESS_URL, params).then((res)=> {
        this.broadcastList = res.data;
      }).catch((err) => {
        this.fetchFail(err);
      });
    },
    // 获取问答数据
    fetchQuestion () {
      const params = {
        productId: this.productId
      };
      this.fetchJsonp(GET_QUESTION_URL, params).then((res) => {
        if (res.resultCode === '0') {
          this.questionList = res.result.questionList;
        }
      }).catch((err) => {
        this.fetchFail(err);
      })
    },
    // 获取规格参数
    fetchSpecification () {
      const params = {
        skuid: this.productId
      };
      this.fetchJsonp(GET_SPECIFICATION_URL, params).then((res) => {
        if (res.errcode === '0') {
          res.data.propGroups[0].atts.map((item) => {
            this.specification.push(item);
          });
          // this.specification = [].concat(res.data.propGroups[0].atts);
        }
      }).catch((err) => {
        this.fetchFail(err);
      });
    },
    /**
     * jsonp请求
     * @param {String}   url,
     * @param {Object}   params， 数据
    */
    fetchJsonp (url, params) {
      const q = querystring.encode(params);
      return new Promise((resolve, reject) => {
        jsonp(`${url}?${q}`, { timeout: 10000 }, (err, res) => {
          if (err) {
            reject('网络不给力，请稍后再试');
          }
          resolve(res);
        })
      });
    },
    fetchFail (error) {
      this.$message({
        type: 'error',
        message: error
      });
    }
  }
}
</script>
<style lang="scss">
.product {
  &-content {
    margin-bottom: rem(15);
  }
  &-tab {
    margin-right: rem(45);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: nth($fgreen, 1);
      &:before {
        content: "\e8ff";
      }
    }
  }
  &-guess {
    margin-top: rem(15);
    background-color: white;
    @include hid;
  }
  &-question {
    background-color: white;
    border-top: 1px solid nth($fgray, 1);
    .question-list {
      padding: 0 rem(20);
      &-item {
        display: flex;
        align-items: center;
        height: rem(70);
        .pull-right {
          color: nth($fblack, 3);
          font-size: rem(24);
        }
        .iconfont {
          padding-right: rem(5);
          color: nth($fyellow, 2);
        }
        .txt {
          flex: 1;
          padding-right: rem(10);
          @include wordbreak;
          @include txthid;
          @include hid;
        }
      }
    }
  }
  &-specifications {
    margin-top: rem(15);
    background-color: white;
  }
  &-title-line {
    border-top: 1px solid nth($fgray, 5);
    width: 80%;
    margin: rem(40) auto 0;
    text-align: center;
    font-size: rem(24);
    color: nth($fblack, 3);
    > span {
      position: relative;
      top: rem(-25);
      display: inline-block;
      padding: 0 rem(20);
      background-color: white;
    }
  }
  &-table {
    padding: rem(20);
  }
}
</style>
