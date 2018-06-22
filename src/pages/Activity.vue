<template>
<div class="page-item">
  <div class="my-slider" @touchmove="handleTouch($event)">
    <slider ref="slider" :pages="sliderPages" :sliderinit="sliderinit">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
    <img class="banner-txt" v-if="bannerSrc" :src="displayRealUrl(staticOrigin, bannerSrc)">
  </div>
  <div class="order-cont">
    <div class="tc">
      <img class="cash" src="../assets/imgs/cash.png">
    </div>
    <div class="form-cont">
      <div class="form-item">
        <div class="label">姓名</div>
        <input type="text" v-model="form.name" placeholder="必填">
      </div>
      <div class="form-item">
        <div class="label">电话</div>
        <input type="text" v-model="form.phone" placeholder="必填">
      </div>
      <div class="form-item">
        <div class="label">城市</div>
        <input type="text" v-model="form.city" placeholder="必填">
      </div>
      <div class="form-item">
        <div class="label">楼盘</div>
        <input type="text" v-model="form.building">
      </div>
      <div class="tc order-btn" @click="order">点击预约</div>
      <div class="tc custom-btn" @click="goCustom">定制须知</div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import { getQueryString, displayRealUrl } from '@/utils'
import slider from 'vue-concise-slider'

export default {
  data () {
    return {
      id: getQueryString('id'),
      origin,
      staticOrigin,
      bannerSrc: '',
      displayRealUrl,
      sliderPages: [],
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
      },
      form: {
        name: '',
        phone: '',
        city: '',
        building: ''
      }
    }
  },
  components: {
    slider
  },
  created () {
    this.$indicator.open({ spinnerType: 'fading-circle' })
    axios({
      url: this.id ? origin + '/cjjjapi/wx/getBizMultiPicsById.action' : origin + '/cjjjapi/wx/findBizMultiPicss.action',
      method: 'post',
      data: {
        id: this.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    })
      .then(res => {
        this.$indicator.close()
        if (res.data.code) {
          return this.$toast(res.data.message)
        }
        // if (!res.data.data.length) {
        //   return this.$messageBox({
        //     title: '没有活动',
        //     message: '请在后台添加活动'
        //   })
        // }
        let sliderImgs = []
        try {
          sliderImgs = this.id ? JSON.parse(res.data.data.detailPicList) : JSON.parse(res.data.data[0].detailPicList)
        } catch (e) {
          sliderImgs = []
        }
        this.bannerSrc = this.id ? res.data.data.mainPic : res.data.data[0].mainPic
        for (let item of sliderImgs) {
          let obj = {}
          obj.style = {
            background: 'url(' + displayRealUrl(staticOrigin, item) + ') no-repeat center center',
            'background-size': '100% 100% !important'
          }
          this.sliderPages.push(obj)
        }
      })
      .catch(err => {
        this.$indicator.close()
        console.log(err)
        this.$toast('客户端请求出错')
      })
  },
  methods: {
    order () {
      if (!this.form.name.trim()) {
        return this.$toast('请填写姓名')
      }
      if (!this.form.phone.trim()) {
        return this.$toast('请填写电话')
      }
      if (!this.form.city.trim()) {
        return this.$toast('请填写城市')
      }
      let data = {
        creatorName: this.form.name,
        phone: this.form.phone,
        cityBuilding: this.form.city + this.form.building
      }
      this.$indicator.open({ spinnerType: 'fading-circle' })
      axios({
        url: origin + '/cjjjapi/wx/saveBizBookingUser.action',
        method: 'post',
        data
      })
        .then(res => {
          this.$indicator.close()
          if (res.data.code) {
            return this.$toast(res.data.message)
          }

          window.localStorage.orderData = JSON.stringify(data)
          localStorage.removeItem('hasGot')

          this.$toast('预约成功')
          setTimeout(() => {
            window.location.href = './get.html'
          }, 1000)
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    },
    goCustom () {
      window.location.href = './custom.html'
    },
    handleTouch (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

body {
  background-color: #22504d;
}
.my-slider {
  position: relative;
  height: 5rem;
  .banner-txt {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    // width: 5.22rem;
    // height: 3.1rem;
    // top: 50%;
    // left: 50%;
    // margin-left: -2.61rem;
    // margin-top: -1.55rem;
    z-index: 10;
    pointer-events: none;
  }
}
.order-cont {
  padding: .3rem;
  .cash {
    width: 4.9rem;
    height: .38rem;
  }
  .form-cont {
    margin-top: .4rem;
    padding: .3rem 1rem;
    background-color: #fffdeb;
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
      background-color: transparent;
    }
  }
  .order-btn {
    margin: .4rem 0;
    width: 4.86rem;
    height: .96rem;
    line-height: .96rem;
    color: #fff;
    font-size: .32rem;
    background: url('../assets/imgs/order-btn.png') no-repeat center center;
    background-size: 100% auto;
    // box-shadow: 0 0 0 .2rem rgba(94, 57, 38, .2);
  }
  .custom-btn {
    color: #5e3926;
  }
  ::-webkit-input-placeholder {
    color: #c7c7c7;
  }
  ::-moz-placeholder {
    color: #c7c7c7;
  }
  input:-moz-placeholder {
    color: #c7c7c7;
  }
  input:-ms-input-placeholder {
    color: #c7c7c7;
  }
}
</style>
