<template>
<div class="page-item">
  <div class="my-slider">
    <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
    <img class="banner-txt" src="../assets/imgs/banner_txt.png">
  </div>
</div>
</template>

<script>
import slider from 'vue-concise-slider'

export default {
  data () {
    return {
      pages: [{
        // html: '<div class="slider1">slider1</div>',
        style: {
          'background': 'url(' + require('../assets/imgs/tmp/1.jpg') + ')'
        }
      },
      {
        // html: '<div class="slider2">slider2</div>',
        style: {
          'background': 'url(' + require('../assets/imgs/tmp/1.jpg') + ')'
        }
      },
      {
        // html: '<div class="slider3">slider3</div>',
        style: {
          'background': 'url(' + require('../assets/imgs/tmp/1.jpg') + ')'
        }
      }],
      sliderinit: {
        // currentPage: 0,
        // thresholdDistance: 500,
        // thresholdTime: 100,
        autoplay: 5000,
        loop: false,
        direction: 'vertical',
        // infinite: 1,
        // slidesToScroll: 1,
        // timingFunction: 'ease',
        duration: 300
      }
    }
  },
  components: {
    slider
  },
  methods: {
    slide () {},
    onTap () {},
    onInit () {}
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

.my-slider {
  position: relative;
  height: 5rem;
  .banner-txt {
    position: absolute;
    width: 5.22rem;
    height: 3.1rem;
    top: 50%;
    left: 50%;
    margin-left: -2.61rem;
    margin-top: -1.55rem;
    z-index: 10;
    pointer-events: none;
  }
}
</style>
