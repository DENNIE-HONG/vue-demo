<template>
  <div class="search">
    <header-banner>
      <search-header :defaultValue="keyword"/>
    </header-banner>
    <ul class="tab">
      <li
        :class="['tab-item', {active: searchType === 1}]"
        @click="changeType(1)">
        <base-select v-model="sendData.sort_type">
          <base-option label="综合" value=""></base-option>
          <base-option label="最新上架" value="sort_winsdate_desc"></base-option>
          <base-option label="价格最低" value="sort_dredisprice_asc"></base-option>
          <base-option label="价格最高" value="sort_dredisprice_desc"></base-option>
          <base-option label="评论最多" value="sort_commentcount_desc"></base-option>
        </base-select>
        <i class="iconfont icon-down"></i>
      </li>
      <li
        :class="['tab-item', {active: searchType === 2}]"
        @click="changeType(2, 'sort_totalsales15_desc')">销量
      </li>
      <li
        :class="['tab-item', {active: searchType === 3}]"
        @click="changeType(3)">
        <base-select v-model="filtType" placeholder="服务" multiple collapseTags>
          <base-option label="京东物流" value="col_type,L0M0"></base-option>
          <base-option label="京尊达" value="product_ext,b3v1"></base-option>
          <base-option label="有货优先" value="redisstore,1"></base-option>
          <base-option label="货到付款" value="cod,L1M1"></base-option>
          <base-option label="全球购商品" value="product_ext,b11v1"></base-option>
        </base-select>
        <i class="iconfont icon-down"></i>
      </li>
    </ul>
    <product-list
      :productList="searchList"
      imgPrefix="//img10.360buyimg.com/n2/s240x240_" />
    <empty-list v-if="firstLoadEmpty" text="暂时搜索不到该商品"/>
    <load-more v-else url="https://so.m.jd.com/ware/search._m2wq_list" :success="loadSuccess" :params="sendData" jsonp ref="loadmore"/>
  </div>
</template>
<script>
import SearchHeader from 'coms/SearchHeader/index.vue';
import LoadMore from 'coms/LoadMore/index.vue';
import ProductList from 'coms/ProductList/index.vue';
import EmptyList from 'coms/EmptyList/index.vue';
import HeaderBanner from 'coms/HeaderBanner/index.vue';
export default {
  name: 'Search',
  components: {
    SearchHeader,
    LoadMore,
    ProductList,
    EmptyList,
    HeaderBanner
  },
  metaInfo: {
    title: 'My Vue Search',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue练习搜索页'
      },
      {
        'name': 'description',
        'content': 'vue练习搜索页'
      }
    ]
  },
  computed: {
    keyword () {
      return this.$route.query.keyword;
    }
  },
  watch: {
    '$route' () {
      // window.location.reload(true);
    },
    'sendData.sort_type' () {
      this.reload();
      this.$refs.loadmore.loadmore();
    },
    filtType (val) {
      this.sendData.filt_type = val.join(';');
      this.reload();
      this.$refs.loadmore.loadmore();
    }
  },
  data () {
    return {
      searchList: [],
      sendData: {
        keyword: this.$route.query.keyword,
        page: 1,
        fdesc: '北京',
        sort_type: '',
        filt_type: ''
      },
      firstLoadEmpty: false,
      searchType: 1,
      filtType: []
    }
  },
  created () {
  },
  methods: {
    loadSuccess (res) {
      if (res.errmsg) {
        this.$refs.loadmore.fail(res.errmsg);
        return;
      }
      if (res.data.searchm.Paragraph.length) {
        for (const item of res.data.searchm.Paragraph) {
          item.sku = item.wareid;
          item.img = item.Content.imageurl;
          item.t = item.Content.warename;
          item.jp = item.dredisprice * 100;
        }
        this.searchList = this.searchList.concat(res.data.searchm.Paragraph);
        this.sendData.page += 1;
      } else {
        this.$refs.loadmore.toEnd();
        this.sendData.page === 1 && (this.firstLoadEmpty = true);
      }
    },
    reload () {
      this.searchList = [];
      this.sendData.page = 1;
      this.firstLoadEmpty = false;
    },
    changeType (searchType, sortType) {
      this.searchType = searchType;
      sortType && (this.sendData.sort_type = sortType);
    }
  }
}
</script>
<style lang="scss">
.search {
  .tab-item {
    width: rem(150);
    display: flex;
    justify-content: center;
    @include txthid;
    @include hid;
    text-align: right;
  }
}
</style>
