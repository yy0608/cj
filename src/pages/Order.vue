<template>
<div class="page-item order-page-cont">
  <img class="logo-img" src="../assets/imgs/order/logo.png">
  <div class="tc bg-cont">
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
  <div class="form-cont">
    <div class="title">
      <div class="label">现名额仅剩</div>
      <div class="number">99</div>
    </div>
    <div class="form-item">
      <input type="text" placeholder="输入姓名获得免费设计">
    </div>
    <div class="form-item">
      <input type="text" placeholder="方便专业设计师联系您">
    </div>
    <div class="tips">*预约成功即可免费预览同户型3D全景效果图</div>
    <div class="submit-cont">
      <img src="../assets/imgs/order/order.png">
    </div>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
// import { origin, staticOrigin } from '@/config'

export default {
  data () {
    return {
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
      ]
    }
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
  .form-cont {
    margin: .3rem;
    border: 1px solid #00474D;
    border-radius: .1rem;
  }
}
</style>
