// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Demo.vue'

import { Toast, Loadmore, Indicator } from 'mint-ui'

Vue.component(Loadmore.name, Loadmore)
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
