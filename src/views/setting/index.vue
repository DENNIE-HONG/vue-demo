<template>
  <div class="setting">
    <header-banner>设置</header-banner>
    <section class="setting-info">
      <div class="info-item">
        <span>vue头像</span>
        <div class="info-item-right">
          <upload-picture
            v-model="avatar"
            @change="isChange = true"
            class="info-item-pic">
          </upload-picture>
        </div>
      </div>
      <div class="info-item">
        <span>vue昵称</span>
        <div class="info-item-right">
          <base-input
            v-model.trim="name"
            maxLength="10"
            @input="isChange = true" />
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
          <base-select v-model="hobby" :style="{textAlign: 'right', height: '1.2rem'}">
            <base-option value="1" label="吴亦凡"></base-option>
            <base-option value="2" label="黄景瑜"></base-option>
          </base-select>
          <i class="iconfont icon-right"></i>
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
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>
    <div
      class="btn-primary btn-large setting-btn"
      @click="modify">提交修改</div>
  </div>
</template>
<script>
/**
 * 设置个人资料页
 * @author luyanhong 2018-08-05
*/
import { getUser, modifyUser } from 'service/api/user.js';
import UploadPicture from 'coms/UploadPicture/index.vue';
import HeaderBanner from 'coms/HeaderBanner/index.vue';
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
        'name': 'description',
        'content': 'vue练习设置也'
      }
    ]
  },
  components: {
    UploadPicture,
    HeaderBanner
  },
  data () {
    return {
      name: '',
      avatar: '',
      gender: 1,
      isHideGender: true,
      checked: true,
      hobby: '1',
      topic: ['3'],
      isChange: false,
      isLoading: false
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
      this.isChange = true;
    },
    hobby (val) {
      console.log(val);
    },
    topic (val) {
      console.log(val);
    }
  },
  created () {
    getUser().then((res) => {
      this.name = res.data.name;
      this.avatar = res.data.avatar;
    });
  },
  methods: {
    handleGender () {
      this.isHideGender = false;
    },
    closeGender (options) {
      this.isHideGender = options.isHide;
    },
    check () {
      let errorMsg;
      if (!this.isChange) {
        errorMsg = '暂时没有修改哦';
        return errorMsg;
      }
      if (!this.name) {
        errorMsg = '修改的昵称不能为空';
        return errorMsg;
      }
      return errorMsg;
    },
    async modify () {
      const errorMsg = this.check();
      if (errorMsg) {
        this.$message({
          type: 'error',
          message: errorMsg
        });
        return;
      }
      try {
        if (this.isLoading) {
          this.$message({
            type: 'warning',
            message: '正在发送，请稍候再试哦'
          });
          return;
        }
        this.isLoading = true;
        await modifyUser({
          name: this.name,
          avatar: this.avatar
        });
        this.$message({
          type: 'success',
          message: '修改成功啦, 棒棒哒~'
        });
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.msg
        });
      } finally {
        this.isLoading = false;
      }
    }

  }
}
</script>
<style lang="scss">
.setting {
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
        min-height: rem(90);
        align-items: center;
        justify-content: flex-end;
        color: nth($fblack, 3);
        font-size: rem(30);
        width: 100%;
        > .iconfont {
          font-size: rem(36);
        }
      }
      &-pic {
        display: inline-block;
        margin: rem(20) rem(20) rem(20) 0;
      }
    }
    .com-input-box {
      text-align: right;
    }
  }
  &-btn {
    margin: rem(70) rem(40);
  }
}
</style>



