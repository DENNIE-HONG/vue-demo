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
        <div class="info-item-right">
          <Upload v-model="avatar" class="info-item-pic"></Upload>
        </div>
      </div>
      <div class="info-item">
        <span>vue昵称</span>
        <div class="info-item-right">
          {{name}}
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>
    <section class="setting-info">
      <div class="info-item">
        <span>性别</span>
        <div class="info-item-right" @click="handleGender">
          {{sex}}
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <base-radio-group
        title="修改性别"
        v-model="gender"
        :is-hide="isHideGender"
        @closeRadio="closeGender">
        <base-radio :label="1">女</base-radio>
        <base-radio :label="2">男</base-radio>
      </base-radio-group>
      <div class="info-item">
        <span>帅吗</span>
        <div class="info-item-right">
          <base-checkbox v-model="checked"/>
        </div>
      </div>
      <div class="info-item">
        <span>兴趣</span>
        <div class="info-item-right">
          <base-select v-model="hobby" :style="{textAlign: 'right'}">
            <base-option value="1" label="吴亦凡"></base-option>
            <base-option value="2" label="黄景瑜"></base-option>
          </base-select>
        </div>
      </div>
      <div class="info-item">
        <span>标签</span>
        <div class="info-item-right">
          <base-select v-model="topic" :style="{textAlign: 'right'}" multiple>
            <base-option value="3" label="沉迷学习"></base-option>
            <base-option value="4" label="不可自拔"></base-option>
            <base-option value="5" label="小点声"></base-option>
            <base-option value="6" label="日渐肥硕"></base-option>
          </base-select>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/**
 * 设置个人资料页
 * @author luyanhong 2018-08-05
*/
import { getUser } from 'service/api/user.js';
import BaseRadioGroup from 'coms/BaseRadio/radio-group.vue';
import BaseRadio from 'coms/BaseRadio/index.vue';
import BaseCheckbox from 'coms/BaseCheckbox/index.vue';
import Upload from 'coms/upload/index.vue';
import BaseSelect from 'coms/BaseSelect/index.vue';
import BaseOption from 'coms/BaseSelect/option.vue';
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
    BaseRadioGroup,
    BaseRadio,
    BaseCheckbox,
    Upload,
    BaseSelect,
    BaseOption
  },
  data () {
    return {
      name: '',
      avatar: '',
      gender: 1,
      isHideGender: true,
      checked: true,
      hobby: '1',
      topic: ['3']
    }
  },
  computed: {
    sex: {
      get () {
        return this.gender === 1 ? '女' : '男'
      }
    }
  },
  watch: {
    gender (val) {
      console.log(val);
    },
    hobby (val) {
      console.log(val);
    }
  },
  created () {
    getUser().then((res) => {
      this.name = res.data.name;
      this.avatar= res.data.avatar;
    });
  },
  methods: {
    handleGender () {
      this.isHideGender = false;
    },
    closeGender (options) {
      this.isHideGender = options.isHide;
    },
    imgUrl (url) {
      console.log(url);
    }
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
      display: flex;
      padding: 0 rem(20);
      background-color: white;
      border-bottom: 1px solid nth($fgray, 1);
      font-size: rem(34);
      line-height: rem(90);
      align-items: center;
      &-right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: nth($fblack, 3);
        font-size: rem(30);
        > .iconfont {
          font-size: rem(36);
        }
      }
      &-pic {
        display: inline-block;
        margin: rem(20) rem(20) rem(20) 0;
      }
    }
  }
}
</style>



