// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Detail.vue'

import { Toast, Indicator, MessageBox } from 'mint-ui'

import FastClick from 'fastclick'

window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.prototype.$messageBox = MessageBox

Vue.config.productionTip = false

let instance = null
function render() {
  instance = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render()
}

export async function bootstrap() {
  console.log('detail bootstrap')
}
export async function mount() {
  render()
  console.log('detail mount')
}
export async function unmount() {
  console.log('detail unmount')
}
