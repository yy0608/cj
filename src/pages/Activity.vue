<template>
<div class="page-item">
  <div class="my-slider">
    <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
    <img class="banner-txt" src="../assets/imgs/banner_txt.png">
  </div>
  <div class="order-cont">
    <div class="tc">
      <img class="cash" src="../assets/imgs/cash.png">
    </div>
    <div class="form-cont">
      <div class="form-item">
        <div class="label">姓名</div>
        <input type="text">
      </div>
      <div class="form-item">
        <div class="label">电话</div>
        <input type="text">
      </div>
      <div class="form-item">
        <div class="label">城市</div>
        <input type="text">
      </div>
      <div class="form-item">
        <div class="label">楼盘</div>
        <input type="text">
      </div>
      <div class="tc order-btn">点击预约</div>
      <div class="tc custom-btn">定制须知</div>
    </div>
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
        loop: true,
        // direction: 'row',
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
.order-cont {
  padding: 0 .3rem;
  background-color: #22504d;
  .cash {
    width: 4.9rem;
    height: .38rem;
  }
  .form-cont {
    margin-top: .2rem;
    padding: .3rem 1rem;
    background-color: #fff;
  }
  .form-item {
    display: flex;
    align-items: center;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #e0e0e0;
      width: 100%;
      height: 1px;
      transform: scaleY(.5);
    }
    .label {
      flex-shrink: 0;
    }
    input {
      height: 1rem;
      padding-left: .3rem;
      flex-grow: 1;
      border-style: none;
    }
  }
  .order-btn {
    margin: .3rem 0;
    width: 4.86rem;
    height: .96rem;
    line-height: .96rem;
    color: #fff;
    font-size: .32rem;
    background: url('../assets/imgs/order-btn.png') no-repeat center center;
    background-size: 100% auto;
  }
}
</style>
