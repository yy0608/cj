<template>
<div class="page-item order-page-cont">
  <img class="logo-img" src="../assets/imgs/order/logo.png" style="position: relative; z-index: 5;">
  <div class="tc bg-cont" style="margin-top: -.8rem;">
    <img src="../assets/imgs/order/backbg.png">
    <img class="forbg" src="../assets/imgs/order/forbg.png">
  </div>
  <div class="steps-cont">
    <div
      class="step-item"
      v-for="(item, index) in stepsList"
      :key="index">
      <img :src="require('../assets/imgs/order/' + item.img)" class="img">
      <div class="tc txt">{{item.text}}</div>
      <div class="rect">{{index + 1}}</div>
    </div>
  </div>
  <div class="gradual-cont">
    <div class="form-cont">
      <div class="title-cont">
        <div class="label">现名额仅剩</div>
        <div class="number">9</div>
        <div class="number">9</div>
      </div>
      <div class="form-item">
        <div class="input-icon name"></div>
        <input type="text" placeholder="输入姓名获得免费设计">
      </div>
      <div class="form-item">
        <div class="input-icon phone"></div>
        <input type="text" placeholder="方便专业设计师联系您">
      </div>
      <div class="tc tips">*预约成功即可免费预览同户型3D全景效果图</div>
      <div class="tc submit-cont">
        <img src="../assets/imgs/order/order2.png" @click="maskShow = true">
      </div>
    </div>
    <div class="ordered-show">
      <div class="quot-item left"></div>
      <!-- <div class="ordered-list">恭喜 玖龙台李**  136****8754 免费预约成功</div> -->
      <slider
        ref="slider"
        :pages="orderedListPages"
        :sliderinit="orderedList">
        <!-- 设置loading,可自定义 -->
        <div slot="loading">loading...</div>
      </slider>
      <div class="quot-item right"></div>
    </div>
  </div>
  <div class="title-cont-item video-cont">
    <div class="title-bg"></div>
    <div class="white-block"></div>
    <div class="video-trigger">
      <img src="../assets/imgs/order/bed.png">
      <div class="play-icon"></div>
    </div>
    <video src="../assets/file/order.mp4" autoplay></video>
  </div>
  <div class="title-cont-item house-cont">
    <div class="title-bg"></div>
    <div class="white-block"></div>
    <slider
      class="common-slider"
      ref="slider"
      :pages="sliderPages"
      :sliderinit="sliderinit1">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
    <div class="tc see-vr">
      <img src="../assets/imgs/order/vr2.png">
    </div>
  </div>
  <div class="title-cont-item style-cont">
    <div class="title-bg"></div>
    <div class="white-block"></div>
    <slider
      class="common-slider"
      ref="slider"
      :pages="sliderPages"
      :sliderinit="sliderinit2">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
  <div class="welfare-cont">
    <div class="tc text-cont">
      <div class="txt1">玖龙台业主专享福利</div>
      <div class="txt2">限100户</div>
    </div>
    <slider
      ref="slider"
      :pages="sliderPages3"
      :sliderinit="sliderinit3">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
  <div class="footer-cont">
    <div class="qrcode">
      <img src="../assets/imgs/order/code.jpg">
    </div>
    <div class="text">
      <p>识别左侧二维码</p>
      <p>免费咨询更多活动内容</p>
      <p>预览更多其他户型效果图</p>
    </div>
    <div class="button">
      <img src="../assets/imgs/order/order2.png">
    </div>
  </div>
  <div class="mask-cont" v-show="maskShow">
    <div class="main-cont">
      <img class="success" src="../assets/imgs/order/success.png">
      <div class="status">预约成功</div>
      <div class="content">您已成功获得童话森林•创家家居设计师免费量尺设计名额。</div>
      <div class="tips">（请留意客服来电）</div>
      <div class="vr">
        <img src="../assets/imgs/order/vr2.png" @click="maskShow = false">
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
// import { origin, staticOrigin } from '@/config'
import slider from 'vue-concise-slider'

export default {
  data () {
    let arr1 = ['客厅', '餐厅', '主卧', '多功能房']
    let arr2 = ['时尚简奢', '北欧', '现代简约', '新中式']
    let arr3 = ['验房团购', '免费出方案', '现金抵扣']
    return {
      maskShow: false,
      stepsList: [
        {
          img: 'step1.png',
          text: '团购价验房'
        },
        {
          img: 'step2.png',
          text: '免费上门量尺'
        },
        {
          img: 'step3.png',
          text: '免费设计出图'
        },
        {
          img: 'step4.png',
          text: '免费送货安装'
        }
      ],
      sliderPages: [
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.11.5870.3838959981735608.jpg) no-repeat center center'
          }
        },
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.17.6810.7949744086730924.jpg) no-repeat center center'
          }
        },
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.23.9460.4814247874799432.jpg) no-repeat center center'
          }
        },
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.30.4460.403050646199278.jpg) no-repeat center center'
          }
        }
      ],
      sliderPages3: [
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.11.5870.3838959981735608.jpg) no-repeat center center'
          }
        },
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.17.6810.7949744086730924.jpg) no-repeat center center'
          }
        },
        {
          style: {
            background: 'url(http://www.cjhome.vip/cjjjapi//pics/act/2018-11-21-16.00.23.9460.4814247874799432.jpg) no-repeat center center'
          }
        }
      ],
      orderedListPages: [
        {
          html: '恭喜 北京市李**  136****8754 免费预约成功'
        },
        {
          html: '恭喜 深圳市邹**  186****8888 免费预约成功'
        },
        {
          html: '恭喜 上海市吴**  166****6666 免费预约成功'
        }
      ],
      sliderinit1: {
        // currentPage: 0,
        // thresholdDistance: 500,
        // thresholdTime: 100,
        autoplay: 5000,
        loop: true,
        // direction: 'row',
        // infinite: 1,
        // slidesToScroll: 1,
        // timingFunction: 'ease',
        duration: 300,
        renderPagination: (h, index) => {
          return h('div', {
            class: 'pagination-item'
          }, [arr1[index - 1]])
        }
      },
      sliderinit2: {
        autoplay: 5000,
        loop: true,
        duration: 300,
        renderPagination: (h, index) => {
          return h('div', {
            class: 'pagination-item'
          }, [arr2[index - 1]])
        }
      },
      sliderinit3: {
        autoplay: 5000,
        loop: true,
        duration: 300,
        renderPagination: (h, index) => {
          return h('div', {
            class: 'pagination-item'
          }, [arr3[index - 1]])
        }
      },
      orderedList: {
        autoplay: 3000,
        loop: true,
        pagination: false,
        direction: 'vertical',
        duration: 300
      }
    }
  },
  components: {
    slider
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

.order-page-cont {
  .logo-img {
    width: 4.4rem;
  }
  .bg-cont {
    position: relative;
    & > img {
      max-width: 100%;
    }
    .forbg {
      position: absolute;
      width: 7.2rem;
      // height: 3.6rem;
      left: 50%;
      top: 1.4rem;
      margin-left: -3.6rem;
    }
  }
  .steps-cont {
    display: flex;
    align-items: center;
    margin: 0 .3rem;
    justify-content: space-between;
  }
  .step-item {
    position: relative;
    .img {
      width: 1.4rem;
    }
    .txt {
      margin-top: .1rem;
      font-size: .24rem;
      color: #1F524E;
    }
    .rect {
      position: absolute;
      left: -.15rem;
      top: -.15rem;
      width: .4rem;
      height: .4rem;
      line-height: .4rem;
      font-size: .26rem;
      text-align: center;
      color: #FBE706;
      background-color: #1F524E;
    }
    &:after {
      content: '';
      position: absolute;
      right: -.3rem;
      top: 50%;
      margin-top: -.2rem;
      width: .24rem;
      height: .24rem;
      background: url('../assets/imgs/order/triangle.png') no-repeat center center;
      background-size: contain;
    }
    &:last-child:after {
      display: none;
    }
  }
  .gradual-cont {
    background: url('../assets/imgs/order/grad.png') no-repeat center 1rem;
    background-size: 100% 100%;
  }
  .form-cont {
    position: relative;
    margin: .74rem .3rem .4rem;
    border: 1px solid #00474D;
    border-radius: .2rem;
    padding: .56rem .65rem .2rem;
    background-color: #fff;
    .form-item {
      display: flex;
      align-items: center;
      margin-bottom: .2rem;
      border: 1px solid #EDF0E9;
      border-radius: .1rem;
      .input-icon {
        width: .8rem;
        height: .8rem;
        &.name {
          background: #EDF0E9 url('../assets/imgs/order/name.png') no-repeat center center;
          background-size: .32rem auto;
        }
        &.phone {
          background: #EDF0E9 url('../assets/imgs/order/phone.png') no-repeat center center;
          background-size: .32rem auto;
        }
      }
      input {
        flex-grow: 1;
        height: .8rem;
        padding-left: .3rem;
        flex-grow: 1;
        border-style: none;
        background-color: transparent;
      }
    }
    .tips {
      font-size: .24rem;
      color: #666666;
    }
    .submit-cont {
      margin-top: .2rem;
      img {
        width: 2.75rem;
        // animation: scaleBtn 1s ease-out infinite alternate;
        // box-shadow: 0px 10px 20px 0px rgba(35,63,61,0.5);
      }
    }
    .title-cont {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: .7rem;
      line-height: .7rem;
      left: 50%;
      top: -.36rem;
      width: 6.6rem;
      margin-left: -3.3rem;
      background-color: #fff;
      &::before {
        content: '';
        position: absolute;
        left: .4rem;
        top: 50%;
        width: .7rem;
        height: .26rem;
        margin-top: -.13rem;
        background: url('../assets/imgs/order/arr-r.png') no-repeat center center;
        background-size: contain;
      }
      &::after {
        content: '';
        position: absolute;
        right: .4rem;
        top: 50%;
        width: .7rem;
        height: .26rem;
        margin-top: -.13rem;
        background: url('../assets/imgs/order/arr-l.png') no-repeat center center;
        background-size: contain;
      }
      .label {
        margin-right: .2rem;
        font-size: .4rem;
        font-weight: bold;
        color: #1F524E;
      }
      .number {
        width: .6rem;
        height: .7rem;
        line-break: .7rem;
        font-size: .6rem;
        margin-right: .08rem;
        color: #DA3A1B;
        text-align: center;
        font-weight: bold;
        border: 1px solid #415262;
        border-radius: .1rem;
      }
    }
  }
  .ordered-show {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: .4rem;
    margin-left: .3rem;
    margin-right: .3rem;
    .quot-item {
      width: .46rem;
      height: .46rem;
      &.left {
        background: url('../assets/imgs/order/quot-l.png') no-repeat center center;
        background-size: contain;
      }
      &.right {
        background: url('../assets/imgs/order/quot-r.png') no-repeat center center;
        background-size: contain;
      }
    }
    .ordered-list {
      font-size: .26rem;
      margin: 0 .28rem;
    }
    .slider-container {
      margin: 0 .28rem;
      height: .26rem;
      .slider-item {
        color: #333;
        font-size: .26rem;
        line-height: .26rem;
      }
    }
  }
  .title-cont-item .title-bg {
    position: relative;
    padding-top: .8rem;
    padding-bottom: .42rem;
    font-size: .48rem;
    text-align: center;
    font-weight: bold;
    color: #1F524E;
    &::before {
      content: '';
      position: absolute;
      bottom: .2rem;
      width: 3rem;
      height: .3rem;
      left: 50%;
      margin-left: -1.5rem;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .video-cont {
    position: relative;
    padding-top: .3rem;
    background-color: #EDF0E9;
    .title-bg {
      background: url('../assets/imgs/order/tree.png') no-repeat left center;
      background-size: auto 1.22rem;
      &::before {
        background-color: #CCD5C1;
      }
      &::after {
      content: '童话森林 时尚实木 精制生活';
      }
    }
    .white-block {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1.94rem;
      background-color: #fff;
    }
    .video-trigger {
      position: relative;
      margin: .8rem .3rem;
      img {
        width: 100%;
      }
      .play-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -.45rem;
        margin-top: -.45rem;
        width: .9rem;
        height: .9rem;
        background: url('../assets/imgs/order/play.png') no-repeat center center;
        background-size: contain;
      }
    }
    video {
      margin: .3rem;
      width: 7.2rem;
    }
  }
  .house-cont {
    position: relative;
    padding-top: .36rem;
    padding-bottom: .75rem;
    background-color: #F4DFCC;
    .title-bg {
      background: url('../assets/imgs/order/pen.png') no-repeat left center;
      background-size: auto 1.22rem;
      &::before {
        background-color: #D8B494;
      }
      &::after {
        content: '全屋免费设计 定制理想之家';
      }
    }
    .white-block {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 5.4rem;
      background-color: #fff;
    }
    .see-vr {
      position: relative;
      margin-top: .4rem;
      img {
        width: 4.98rem;
        // animation: scaleBtn 1s ease-out infinite alternate;
        // box-shadow:0px 10px 20px 0px rgba(35,63,61,0.5);
      }
    }
  }
  .style-cont {
    position: relative;
    padding-top: .43rem;
    padding-bottom: 1.1rem;
    background-color: #C5DEDB;
    .title-bg {
      background: url('../assets/imgs/order/brush.png') no-repeat left center;
      background-size: auto 1.22rem;
      &::before {
        background-color: #9ECEC8;
      }
      &::after {
        content: '风格齐全 任君选择';
      }
    }
    .white-block {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4.2rem;
      background-color: #fff;
    }
    .slider-container {
      margin-bottom: 0;
    }
  }
  .welfare-cont {
    padding-bottom: .44rem;
    background: url('../assets/imgs/order/welfare.png') no-repeat center top;
    background-size: 100% auto;
    .text-cont {
      padding-top: 1.43rem;
      color: #EA2A2E;
      .txt1 {
        font-size: .6rem;
        font-weight: bold;
      }
      .txt2 {
        margin-top: .28rem;
        font-size: .3rem;
      }
    }
    .slider-container {
      height: initial;
      margin: .68rem .3rem 0;
      width: initial;
      background-color: #fff;
      .slider-item {
        height: 3.88rem;
        background-size: cover !important;
      }
      .slider-pagination {
        position: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        width: initial;
        margin-top: .4rem;
        .pagination-item {
          position: relative;
          flex-grow: 1;
          height: .6rem;
          line-height: .6rem;
          font-size: .3rem;
          border: 1px solid transparent;
          color: #666;
        }
        .slider-pagination-bullet-active-render {
          color: #A284D7;
          border-color: #A284D7;
          border-radius: .3rem;
        }
      }
    }
  }
  .footer-cont {
    display: flex;
    align-items: center;
    padding: .2rem;
    background-color: #C5DEDB;
    .qrcode {
      flex-shrink: 0;
      img {
        width: 1.6rem;
      }
    }
    .text {
      flex-grow: 1;
      margin-left: .11rem;
      font-size: .24rem;
      color: #1F524E;
      p {
        margin-bottom: .1rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .button {
      flex-shrink: 0;
      // padding-left: .16rem;
      text-align: center;
      // box-shadow:0px 10px 20px 0px rgba(35,63,61,0.5);
      img {
        animation: scaleBtn 1s ease-out infinite alternate;
        width: 2.75rem;
      }
    }
  }
  .common-slider {
    margin: .68rem .3rem;
    width: initial;
    background-color: #fff;
    .slider-item {
      height: 3.88rem;
      background-size: cover !important;
    }
    .slider-pagination {
      position: initial;
      display: flex;
      align-items: center;
      justify-content: center;
      width: initial;
      height: .8rem;
      margin-top: .2rem;
      border: 1px solid #CCCCCC;
      .pagination-item {
        position: relative;
        flex-grow: 1;
        height: .4rem;
        line-height: .4rem;
        font-size: .3rem;
        color: #999;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background-color: #CCCCCC;
        }
        &:last-child:after {
          display: none;
        }
      }
      .slider-pagination-bullet-active-render {
        color: #1F524E;
        font-weight: bold;
      }
    }
  }
  .mask-cont {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;
    .main-cont {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -2.7rem;
      margin-top: -2.7rem;
      padding-top: .4rem;
      width: 5.4rem;
      height: 5rem;
      background-color: #fff;
      border-radius: .2rem;
      text-align: center;
    }
    .success {
      width: 1.4rem;
      height: 1.4rem;
    }
    .status {
      font-size: .32rem;
      color: #FC7548;
    }
    .content {
      margin: .3rem .45rem;
      font-size: .32rem;
      line-height: 1.3;
      color: #1E1E1E;
    }
    .tips {
      margin-bottom: .3rem;
    }
    .vr {
      text-align: center;
      img {
        width: 4.98rem;
        // animation: scaleBtn 1s ease-out infinite alternate;
      }
    }
  }
}
@keyframes scaleBtn {
  0% {transform: scale(1);}
  50% {transform: scale(1.1);}
  100% {transform: scale(1);}
}
</style>
