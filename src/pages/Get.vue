<template>
<div class="page-item get-cont">
  <div class="tc logo-cont">
    <img class="logo" src="../assets/imgs/get_logo.png">
  </div>
  <div class="get-block">
    <div class="money-cont">
      <div class="symbol">&yen;</div>
      <div class="number">{{getMoney}}</div>
    </div>
    <div class="get-btn" @click="get"></div>
  </div>
  <div class="get-tips">
    <div class="title-cont">
      <div class="title-inner">贴心提示</div>
    </div>
    <ul>
      <li>在创家消费凭本券可抵押现金使用</li>
      <li>本券可与其他优惠活动重叠使用</li>
      <li>本券仅限预约实名使用一次</li>
      <li>本券不可叠加使用</li>
      <li>最终解释权归创家家居所有</li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config'

export default {
  data () {
    return {
      hasGot: !!window.localStorage.hasGot,
      getMoney: ''
    }
  },
  created () {
    axios({
      url: origin + '/cjjjapi/wx/getBizConfig.action',
      method: 'post',
      data: { cfgId: 'couponMoney' }
    })
      .then(res => {
        if (res.data.code) {
          return this.$toast(res.data.message)
        }
        this.getMoney = res.data.data.cfgValue
      })
      .catch(err => {
        console.log(err)
        this.$toast('客户端请求出错')
      })
  },
  methods: {
    get () {
      if (this.hasGot) {
        return this.$messageBox({
          title: '领取成功',
          message: '请不要重复领取'
        })
      }
      try {
        this.orderData = JSON.parse(window.localStorage.orderData)
      } catch (e) {
        return this.$messageBox({
          title: '没有预约',
          message: '请先预约后再领取'
        })
      }
      axios({
        url: origin + '/cjjjapi/wx/saveCouponInfo.action',
        method: 'post',
        data: this.orderData
      })
        .then(res => {
          console.log(res.data)
          this.$indicator.close()
          if (res.data.code) {
            return this.$toast(res.data.message)
          }

          this.$toast('领取成功')
          this.hasGot = true
          window.localStorage.hasGot = '1'
          localStorage.removeItem('orderData')
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

html, body {
  height: 100%;
}
.get-cont {
  min-height: 100%;
  padding: .3rem;
  box-sizing: border-box;
  background: url('../assets/imgs/get_bg.png') no-repeat center center;
  background-size: 100% 100%;
}
.logo {
  width: 2.88rem;
  height: 1.02rem;
}
.get-block {
  position: relative;
  margin: .3rem auto;
  width: 5.98rem;
  height: 6.58rem;
  background: url('../assets/imgs/get_block.png') no-repeat center center;
  background-size: 100% auto;
  .get-btn {
    position: absolute;
    bottom: .7rem;
    left: 50%;
    margin-left: -1.5rem;
    width: 3rem;
    height: 1rem;
  }
}
.money-cont {
  display: flex;
  height: 5.4rem;
  line-height: 5.4rem;
  align-items: baseline;
  justify-content: center;
  color: #ffb90b;
  font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
  .symbol {
    font-size: .8rem;
  }
  .number {
    font-size: 1.6rem;
  }
}
.get-tips {
  color: #fff;
  .title-cont {
    display: flex;
    justify-content: center;
  }
  .title-inner {
    position: relative;
    padding: 0 .45rem;
    height: .5rem;
    line-height: .5rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2rem;
      height: 100%;
      background: url('../assets/imgs/dots.png') no-repeat left center;
      background-size: .22rem auto;
    }
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 2rem;
      height: 100%;
      background: url('../assets/imgs/dots.png') no-repeat right center;
      background-size: .22rem auto;
    }
  }
  ul {
    padding: 0 1.2rem;
    margin-top: .2rem;
    list-style: disc;
  }
  li {
    line-height: .5rem;
  }
}
</style>
