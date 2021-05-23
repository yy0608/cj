// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Index.vue'

let instance = null
function render() {
  instance = new Vue({
    render: h => {
      if (instance) {
        // 子应用的页面缓存（如果是单页面里的，只用keep-alive就行）
        instance._vnode.data.keepAlive = true;
        return instance._vnode;
      }
      return h(App);
    }
  }).$mount("#app");
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render()
}

export async function bootstrap() {
  console.log('home bootstrap')
}
export async function mount() {
  render()
  console.log('home mount')
}
export async function unmount() {
  console.log('home unmount')
}
