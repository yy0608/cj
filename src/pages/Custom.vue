<template>
<div class="page-item" @touchmove="contTouch($event)">
  <div class="my-slider">
    <slider ref="slider" :pages="sliderPages" :sliderinit="sliderinit" @slide="slide">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
  <div class="want-order" v-show="showOrder" @click="goOrder">我要预约</div>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import slider from 'vue-concise-slider'
import { displayRealUrl } from '@/utils'

export default {
  data () {
    return {
      showOrder: false,
      sliderPages: [],
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
  created () {
    this.$indicator.open({ spinnerType: 'fading-circle' })
    axios({
      url: origin + '/cjjjapi/wx/getBizMultiPicsById.action',
      method: 'post',
      data: { id: 'flow' }
    })
      .then(res => {
        this.$indicator.close()
        if (res.data.code) {
          return this.$toast(res.data.message)
        }
        let sliderImgs = []
        try {
          sliderImgs = JSON.parse(res.data.data.detailPicList)
        } catch (e) {
          sliderImgs = []
        }
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
    contTouch (e) {
      e.preventDefault()
    },
    slide (data) {
      this.showOrder = data.currentPage === this.sliderPages.length - 1
    },
    goOrder () {
      window.location.href = './activity.html'
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

html, body {
  background-color: #20504e;
}
.my-slider {
  position: relative;
  height: 100vh;
}
.want-order {
  position: fixed;
  z-index: 10;
  bottom: .5rem;
  left: 50%;
  margin-left: -3rem;
  width: 6rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  border-radius: .06rem;
  background-color: #d71d26;
  color: #fff;
}
</style>
