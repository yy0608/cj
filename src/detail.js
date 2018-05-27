// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Detail.vue'

import { Toast, Indicator, MessageBox } from 'mint-ui'

Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.prototype.$messageBox = MessageBox

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
