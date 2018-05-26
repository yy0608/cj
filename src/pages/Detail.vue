<template>
<div class="page-item">
  <rich-content :richContent="richContent"></rich-content>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config'
import { getQueryString } from '@/utils'
import RichContent from '@/components/RichContent.vue'

export default {
  data () {
    return {
      id: getQueryString('id'),
      richContent: ''
    }
  },
  components: {
    RichContent
  },
  created () {
    if (!this.id) {
      return this.$messageBox({
        title: '提示',
        message: '地址栏缺少id参数'
      })
    }
    axios({
      url: origin + '/cjjjapi/wx/getBizHouseBeautifyById.action',
      method: 'post',
      data: { id: this.id }
    })
      .then(res => {
        if (res.data.code) {
          return this.$toast(res.data.msg)
        }

        console.log(res.data.data.contentUrl)
        axios({
          url: origin + '/cjjjapi' + res.data.data.contentUrl,
          method: 'get'
        })
          .then(res => {
            // if (res.data.code) {
            //   return this.$toast(res.data.msg)
            // }

            res.data = res.data.replace('src="/cjjjapi/pics/', 'src="' + origin + '/cjjjapi/pics/')

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
