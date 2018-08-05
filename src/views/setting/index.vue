<template>
  <div class="setting">
    <header>
      <router-link to="/my" class="header-btn"><i class="iconfont icon-left"></i></router-link>
      <span>设置</span>
      <router-link to="/" class="header-btn header-home"><i class="iconfont icon-home"></i></router-link>
    </header>
    <section class="setting-info">
      <div class="info-item">
        <span>vue头像</span>
        <div class="pull-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="info-item">
        <span>vue昵称</span>
        <div class="pull-right">
          {{name}}
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>
    <section class="setting-info">
      <div class="info-item">
        <span>性别</span>
        <div class="pull-right"><i class="iconfont icon-right"></i></div>
      </div>
      <base-radio>女</base-radio>
      <base-radio>男</base-radio>
    </section>
  </div>
</template>
<script>
/**
 * 设置个人资料页
 * @author luyanhong 2019-08-05
*/
import { getUser } from 'service/api/user.js';
import BaseRadio from 'coms/BaseRadio/index.vue';
export default {
  name: 'Setting',
  metaInfo: {
    title: 'my setting',
     meta: [
      {
        'property': 'keywords',
        'content': 'vue设置页'
      },
      {
        'property': 'description',
        'content': 'vue练习设置也'
      }
    ]
  },
  components: {
    BaseRadio
  },
  data () {
    return {
      name: '',
      avatar: ''
    }
  },

  created () {
    getUser().then((res) => {
      this.name = res.data.name;
      this.avatar= res.data.avatar;
    });
  }
}
</script>
<style lang="scss">
.setting {
  header {
    display: flex;
    height: rem(88);
    padding: 0 rem(20);
    background-color: white;
    justify-content: space-between;
    align-items: center;
    font-size: rem(34);
    border-bottom: 1px solid nth($fgray, 1);
    .header-btn {
      width: rem(100);
      > .iconfont {
        font-size: rem(36);
      }
    }
    .header-home {
      text-align: right;
      > .iconfont {
        font-size: rem(50);
      }
    }
  }
  &-info {
    margin-bottom: rem(15);
    .info-item {
      padding: 0 rem(20);
      background-color: white;
      border-bottom: 1px solid nth($fgray, 1);
      font-size: rem(34);
      line-height: rem(90);
      @include hid;
      .pull-right {
        width: 50%;
        text-align: right;
        color: nth($fblack, 3);
        font-size: rem(30);
        > .iconfont {
          position: relative;
          top: rem(4);
          font-size: rem(36);
        }
      }
    }
  }
}
</style>



