<template>
  <div class="search">
    <header class="search-head">
      <router-link to="/" class="header-go-back" v-once><i class="iconfont icon-left"></i></router-link>
      <search-header :defaultValue="keyword"/>
      <drop-down>
        <div class="header-more"><i class="iconfont icon-transverse-more"></i></div>
        <drop-down-menu slot="dropdown">
          <drop-down-item>
            <router-link to="/"><i class="iconfont icon-home"></i>首页</router-link>
          </drop-down-item>
          <drop-down-item>
            <router-link to="/my"><i class="iconfont icon-user"></i>我的vue</router-link>
          </drop-down-item>
        </drop-down-menu>
      </drop-down>
    </header>
    <product-list :productList="searchList" />
    <empty-list v-if="firstLoadEmpty" text="暂时搜索不到该商品"/>
    <load-more v-else :url="url" :success="loadSuccess" :params="sendData" jsonp ref="loadmore"/>
    <the-footer />
  </div>
</template>
<script>
import SearchHeader from 'coms/SearchHeader/index.vue';
import LoadMore from 'coms/LoadMore/index.vue';
import ProductList from 'coms/ProductList/index.vue';
import EmptyList from 'coms/EmptyList/index.vue';
import DropDown from 'coms/DropDown/index.vue';
import DropDownMenu from 'coms/DropDown/menu.vue';
import DropDownItem from 'coms/DropDown/item.vue';
import TheFooter from 'coms/Layout/TheFooter.vue';
export default {
  name: 'Search',
  components: {
    SearchHeader,
    LoadMore,
    ProductList,
    EmptyList,
    DropDown,
    DropDownMenu,
    DropDownItem,
    TheFooter
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


