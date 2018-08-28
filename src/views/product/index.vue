<template>
  <div class="product page">
    <div class="content">
      <header-banner>商品页</header-banner>
      <empty-list text="哈哈哈哈哈，抓不到数据啦" />
      <section>
        <comment-list />

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

    }
  },
  created () {

  },
  methods: {

  }
}
</script>
