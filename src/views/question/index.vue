<template>
  <div class="question">
    <header-banner>问答专区</header-banner>
    <section class="question-box">
      <dt>
        <router-link
          :to="'/product/' + productId"
          class="title question-link">关于“ <span class="question-link-txt">{{questionTitle}}</span>” 的{{total}}个问题
          <span class="pull-right"><i class="iconfont icon-right"></i></span>
        </router-link>
      </dt>
      <dl class="question-list">
        <dd
          v-for="item in questionList"
          :key="item.id"
          class="question-item">
          <router-link :to="'/question/' + productId + '/detail/' + item.id">
            <div class="question-info">
              {{item.pin}}的提问:
              <span class="pull-right">{{item.created}}</span>
            </div>
            <h3 class="question-title"><i class="iconfont icon-ask"></i>{{item.content}}</h3>
            <article class="question-content"><i class="iconfont icon-write"></i>{{item.answerCount ? item.answerList[0].content:
            '暂无回答'}}</article>
            <div
              v-if="item.answerCount"
              class="question-more pull-right">查看全部{{item.answerCount}}个回答<i class="iconfont icon-right"></i></div>
          </router-link>
        </dd>
      </dl>
      <load-more
        ref="loadmore"
        url="/jdapi/questionanswer/GetSkuQuestionList"
        :params="sentData"
        :success="fetchData"
        jsonp
      />
    </section>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import LoadMore from 'coms/LoadMore';
export default {
  name: 'Question',
  components: {
    HeaderBanner,
    LoadMore
  },
  metaInfo: {
    title: 'my question',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue问题页'
      },
      {
        'name': 'description',
        'content': 'vue问题页'
      }
    ]
  },
  data () {
    return {
      questionList: [],
      productId: this.$route.params.productId,
      total: 0,
      sentData: {
        pageSize: 10,
        page: 1,
        productId: this.$route.params.productId
      },
      questionTitle: ''
    }
  },
  methods: {
    fetchData (res) {
      if (res.resultCode === '0') {
        const { questionList } = res.result;
        if (!this.questionTitle) {
          this.total = res.result.totalItem;
          this.questionTitle = res.result.skuInfo.fullName;
        }
        if (questionList.length) {
          this.questionList = this.questionList.concat(questionList);
          if (questionList.length < this.sentData.pageSize) {
            if (this.sentData.page === 1) {
              this.$refs.loadmore.hide();
            } else {
              this.$refs.loadmore.toEnd();
            }
            return;
          }
          this.sentData.page += 1;
        } else {
          this.$refs.loadmore.toEnd();
        }
      } else {
        this.$refs.loadmore.fail('error');
      }
    }
  }
}
</script>
<style lang="scss">
.question {
  .question-link {
    display: flex;
    &-txt {
      display: inline-block;
      flex: 1;
      @include txthid;
      @include hid;
      @include wordbreak;
      // vertical-align: bottom;
    }
  }
  &-item {
    padding: rem(20);
    margin-top: rem(15);
    background-color: white;
    @include hid;
  }
  &-info {
    color: nth($fblack, 3);
    font-size: rem(24);
  }
  &-title {
    margin: rem(15) 0;
    > .iconfont {
      padding-right: rem(5);
      color: nth($fyellow, 2);
    }
  }
  &-content {
    > .iconfont {
      padding-right: rem(5);
      color: nth($fgreen, 1);
    }
  }
  &-more {
    margin-top: rem(10);
    color: nth($fgreen, 1);
    font-size: rem(24);
    line-height: 1;
    .iconfont {
      position: relative;
      top: 1px;
      font-size: rem(28);
    }
  }
}
</style>
