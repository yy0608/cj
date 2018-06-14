<template>
<div class="page-item">
  <rich-content :richContent="richContent"></rich-content>
  <order-btn></order-btn>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import { getQueryString, displayRealUrl } from '@/utils'
import RichContent from '@/components/RichContent.vue'
import OrderBtn from '@/components/OrderBtn.vue'

export default {
  data () {
    return {
      id: getQueryString('id'),
      richContent: ''
    }
  },
  components: {
    RichContent,
    OrderBtn
  },
  created () {
    if (!this.id) {
      return this.$messageBox({
        title: '提示',
        message: '地址栏缺少id参数'
      })
    }
    this.$indicator.open({ spinnerType: 'fading-circle' })
    axios({
      url: origin + '/cjjjapi/wx/getBizHouseBeautifyById.action',
      method: 'post',
      data: { id: this.id }
    })
      .then(res => {
        if (res.data.code) {
          return this.$toast(res.data.message)
        }

        let contentUrl = res.data.data.contentUrl

        // if (/^http((:\/\/)|(s:\/\/))/.test(contentUrl)) {
        //   if (window.localStorage.needJump) {
        //     window.location.href = contentUrl
        //     window.localStorage.removeItem('needJump')
        //   } else {
        //     window.history.go(-1)
        //   }
        //   return
        // }

        axios({
          url: displayRealUrl(staticOrigin, contentUrl) + '?t=' + Date.now(),
          // url: 'https://mp.weixin.qq.com/s/hi3nINCdSy6WOG3qNUFa9w',
          method: 'get'
        })
          .then(res => {
            this.$indicator.close()
            // if (res.data.code) {
            //   return this.$toast(res.data.message)
            // }

            res.data = res.data.replace(/src="\/cjjjapi\/pics\//ig, 'src="' + origin + '/cjjjapi/pics/')

            this.richContent = res.data
          })
          .catch(err => {
            this.$indicator.close()
            if (window.localStorage.needJump) {
              window.location.href = displayRealUrl(staticOrigin, contentUrl)
              window.localStorage.removeItem('needJump')
            } else {
              window.history.go(-1)
            }
            console.log(err)
            // this.$toast('客户端请求出错')
          })
      })
      .catch(err => {
        this.$indicator.close()
        console.log(err)
        this.$toast('客户端请求出错')
      })
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';
</style>
