<template>
<div class="page-item">
  <div v-for="item in teamList" :key="item.id" class="team-cont-item">
    <div class="title">{{item.name}}</div>
    <div v-for="item2 in item.members" :key="item2.id" class="team-cont">
      <div class="team-item">
        <div class="avatar">
          <img :src="item2.headPicUrl">
        </div>
        <div class="text-cont">
          <div class="title-cont">
            <div class="name">{{item2.name}} | {{item2.title}}</div>
            <div v-if="!isEmptyUrl(item2.qrUrl)" class="wechat" @click="handleShowQrUrl(item2.qrUrl)">+ 微信</div>
          </div>
          <div class="intro">{{item2.noteInfo}}</div>
        </div>
      </div>
    </div>
  </div>
  <order-btn></order-btn>
  <div class="qr-cont" v-if="showRrUrl" @click="showRrUrl = false">
    <img @click.stop="" :src="qrUrl" @error="imgError($event)">
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import OrderBtn from '@/components/OrderBtn.vue'

export default {
  data () {
    return {
      teamList: [],
      showRrUrl: false,
      qrUrl: ''
    }
  },
  components: {
    OrderBtn
  },
  created () {
    this.$indicator.open({ spinnerType: 'fading-circle' })
    axios({
      url: origin + '/cjjjapi/wx/findBizBizTeamGroup.action',
      method: 'post',
      data: {}
    })
      .then(res => {
        this.$indicator.close()
        if (res.data.code) {
          return this.$toast(res.data.message)
        }
        this.teamList = res.data.data
      })
      .catch(err => {
        this.$indicator.close()
        console.log(err)
        this.$toast('客户端请求出错')
      })
  },
  methods: {
    handleShowQrUrl (url) {
      this.showRrUrl = true
      this.qrUrl = url
    },
    imgError (e) {
      this.$toast('图片加载失败')
      e.currentTarget.src = 'https://dn-placeholder.qbox.me/200x200/f5f5f5/888'
    },
    isEmptyUrl (url) {
      if (!url || url === location.protocol + staticOrigin + '/') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

.page-item {
  padding-bottom: 1rem;
}

.team-cont-item {
  padding: .2rem 0 .2rem .2rem;
  .title {
    padding-left: .1rem;
    margin: .2rem 0;
    font-size: .32rem;
  }
  .team-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: .2rem;
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
    .avatar {
      flex-shrink: 0;
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text-cont {
      flex-grow: 1;
      margin-left: .2rem;
    }
    .title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: .3rem;
      }
      .wechat {
        padding: .1rem .2rem;
        font-size: .24rem;
        color: #fff;
        background-color: #245350;
      }
    }
    .intro {
      margin-top: .15rem;
      color: #666;
      line-height: .36rem;
    }
  }
}
.qr-cont {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .75);
  align-items: center;
  justify-content: center;
  & > img {
    max-width: 80%;
    max-height: 80%;
  }
}
</style>
