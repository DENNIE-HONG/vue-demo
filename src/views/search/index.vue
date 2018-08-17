<template>
  <div class="search">
    <header class="search-head">
      <router-link to="/" class="header-go-back" v-once><i class="iconfont icon-left"></i></router-link>
      <search-header :defaultValue="keyword"/>
      <div class="header-more"><i class="iconfont icon-transverse-more"></i></div>
    </header>
    <product-list :productList="searchList" />
    <Empty v-if="firstLoadEmpty" text="暂时搜索不到该商品"/>
    <Loadmore v-else :url="url" :success="loadSuccess" :params="sendData" jsonp ref="loadmore"/>
  </div>
</template>
<script>
import SearchHeader from 'coms/search-header/index.vue';
import Loadmore from 'coms/loadmore/index.vue';
import ProductList from 'coms/productList/index.vue';
import Empty from 'coms/empty/index.vue';
export default {
  name: 'Search',
  components: {
    SearchHeader,
    Loadmore,
    ProductList,
    Empty
  },
  computed: {
    keyword () {
      return this.$route.query.keyword;
    }
  },
  watch: {
    '$route' () {
      window.location.reload(true);
    }
  },
  data () {
    return {
      url: 'https://so.m.jd.com/ware/search._m2wq_list',
      searchList: [],
      sendData: {
        keyword: this.$route.query.keyword,
        page: 1,
        fdesc: '北京'
      },
      firstLoadEmpty: false
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
          item.wareId = item.wareid;
          item.imageurl = `//img11.360buyimg.com/n7/s360x360_${item.Content.imageurl}`;
          item.wname = item.Content.warename;
          item.jdPrice = item.dredisprice;
          item.itemType = item.venderType;
        }
        this.searchList = this.searchList.concat(res.data.searchm.Paragraph);
        this.sendData.page += 1;
      } else {
        this.$refs.loadmore.toEnd();
        this.sendData.page === 1 && (this.firstLoadEmpty = true);
      }

    }
  }
}
</script>
<style lang="scss">
.search {
  &-head {
    display: flex;
    padding: rem(20) 0;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid nth($fgray, 1);
    .search-header {
      flex: 1;
    }
  }
}
</style>


