// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Order.vue'

import { Toast, Indicator } from 'mint-ui'

// import FastClick from 'fastclick'

// window.addEventListener('load', () => {
//   FastClick.attach(document.body)
// })

Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
