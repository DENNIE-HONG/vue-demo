<template>
  <div class="com-bigpic">
    <div class="modal-bg black">
      <div class="com-bigpic-box">
        <v-touch
          ref="swiper"
          tag="ul"
          class="com-bigpic-list"
          @swipeleft="swipeLeft"
          @swiperight="swipeRight"
          :style="{width: imgCount * 100 + '%'}">
          <li
            v-for="img in imgList"
            :key="img.id"
            class="com-bigpic-item">
            <img :src="img.imgUrl" />
          </li>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 查看大图
 * @param {Array}  imgList, 图片列表
 * @param {Number} startIndex, 从第几张开始看
 * @author luyanhong 2018-08-31
*/
import lockWindow from 'utils/lockWindow.js';
export default {
  name: 'BigPictures',
  props: {
    imgList: {
      required: true,
      type: Array
    },
    startIndex: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      imgIndex: this.startIndex
    }
  },
  computed: {
    imgCount () {
      return this.imgList.length;
    }
  },
  watch: {
    imgIndex (index) {
      const percent = -1 / this.imgCount * (index - 1) * 100;
      this.$refs.swiper.$el.style.transform = `translateX(${percent}%)`;
    }
  },
  created () {
    lockWindow();
    if (this.startIndex > 1) {
      this.c
    }
  },
  methods: {
    // 向左滑动
    swipeLeft () {
      if (this.imgIndex === this.imgCount) {
        return;
      }
      console.log(this.imgIndex);
      this.imgIndex += 1;
    },
    // 向右滑动
    swipeRight () {
      if (this.imgIndex === 1) {
        return;
      }
      this.imgIndex -= 1;
      console.log(this.imgIndex);
    },
    setTransform (translateX) {
      this.$refs.swiper.$el.style.transform = `translateX(${translateX}%)`;
    }
  }
}
</script>
<style lang="scss">
.com-bigpic {
  .modal-bg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-box {
    @include hid;
  }
  &-list {
    display: flex;
    width: 200%;
    transition: transform 0.5s ease;
  }
  &-item {
    width: 100%;
    @include hid;
    > img {
      display: block;
      max-width: 100%;
      height: auto;
      margin: auto;
    }
  }
}
</style>
