<template>
  <div class="home">
    <CommonHead />
    <div>hello</div>
    <footer class="home-footer">
      <nav>
        <a class="active" href="javascript:;  "><i class="iconfont icon-home"></i><p class="footer-txt">首页</p></a>
        <router-link to="/my"><i class="iconfont icon-user"></i><p class="footer-txt">我的</p></router-link>
      </nav>
    </footer>
  </div>
</template>
<script>
import CommonHead from 'coms/commonHead';
export default {
  name: 'Home',
  components: {
    CommonHead
  },
  metaInfo: {
    title: 'My Vue Home',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue练习首页'
      },
      {
        'property': 'description',
        'content': 'vue练习首页'
      }
    ]
  }
}
</script>
<style lang="scss">
.home {
  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: rem(90);
    border-top: 1px solid nth($fgray, 1);
    background-color: white;
    > nav {
      display: flex;
      justify-content: space-around;

    }
    a {
      text-align: center;
      color: nth($fblack, 2);
      &.active {
        color: nth($fgreen, 1);
      }
    }
    .footer-txt {
      margin-top: 0;
      line-height: 1;
    }
  }
}
</style>

