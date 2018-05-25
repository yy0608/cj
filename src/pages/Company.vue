<template>
<div class="page-item">
  <rich-content :content="content"></rich-content>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config'
import RichContent from '@/components/RichContent.vue'

export default {
  data () {
    return {
      content: null
    }
  },
  components: {
    RichContent
  },
  created () {
    axios({
      url: origin + '/cjjjapi/wx/getBizArticleShareById.action',
      method: 'post',
      data: { id: 'gongsijianjie' }
    })
      .then(res => {
        if (res.data.code) {
          this.$toast(res.data.msg)
        }
        console.log(res.data)
        this.content = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';
</style>
