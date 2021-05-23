// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/Products.vue'
import router2 from '@/router/products'
import VueRouter from 'vue-router'
import ProductA from '@/components/ProductA'
import ProductB from '@/components/ProductB'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'ProductA'
    },
  },
  {
    name: 'ProductA',
    path: '/product/a',
    component: ProductA
  },
  {
    path: '/product/b',
    component: ProductB
  }
]

let router = null
let instance = null
function render() {
  instance = new Vue({
    el: '#app',
    router: router2,
    components: { App },
    template: '<App/>'
  })
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render()
}

Vue.use(VueRouter)

export async function bootstrap() {
  console.log('products bootstrap')
}
export async function mount() {
  // render()
  // console.log('products mount')

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/products" : "/",
    mode: "history",
    routes
  });

  instance = new Vue({
    router,
    render: h => {
      if (instance) {
        instance._vnode.data.keepAlive = true;
        return instance._vnode;
      }
      return h(App);
    }
  }).$mount("#app");
}
export async function unmount() {
  console.log('products unmount')
  router = null;
}
