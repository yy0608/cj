<template>
<div class="page-item">
  <rich-content :richContent="richContent"></rich-content>
  <order-btn></order-btn>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import { getQueryString } from '@/utils'
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
          return this.$toast(res.data.msg)
        }

        axios({
          url: staticOrigin + res.data.data.contentUrl,
          method: 'get'
        })
          .then(res => {
            this.$indicator.close()
            // if (res.data.code) {
            //   return this.$toast(res.data.msg)
            // }

            res.data = res.data.replace(/src="\/cjjjapi\/pics\//ig, 'src="' + origin + '/cjjjapi/pics/')

            this.richContent = res.data
          })
          .catch(err => {
            console.log(err)
            this.$toast('客户端请求出错')
          })
      })
      .catch(err => {
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
