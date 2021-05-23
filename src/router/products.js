import VueRouter from 'vue-router'
import ProductA from '@/components/ProductA'
import ProductB from '@/components/ProductB'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
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
})

export default router
