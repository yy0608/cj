<template>
<div class="page-item">
  <rich-content :richContent="richContent"></rich-content>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import RichContent from '@/components/RichContent.vue'

export default {
  data () {
    return {
      richContent: ''
    }
  },
  components: {
    RichContent
  },
  created () {
    this.$indicator.open({ spinnerType: 'fading-circle' })
    axios({
      url: origin + '/cjjjapi/wx/getBizArticleShareById.action',
      method: 'post',
      data: { id: 'gongsijianjie' }
    })
      .then(res => {
        if (res.data.code) {
          this.$toast(res.data.msg)
        }
        if (!res.data.data.contentUrl) {
          this.$indicator.close()
          return this.$messageBox({
            title: '提示',
            message: '请先在后台编辑公司简介'
          })
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
            this.$indicator.close()
            console.log(err)
            this.$toast('客户端请求出错')
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
