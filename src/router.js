import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import User from './views/User.vue'
import UserCenter from './views/UserCenter.vue'
import ShowList from './views/ShowList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list/:kw',
      name: 'ShowList',
      component: ShowList,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/product/:pid',
      name: 'product',
      component: Product,
      props: true
    },
    {
      path: '/user/:active',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/usercenter/:tag',
      name: 'usercenter',
      component: UserCenter,
      props: true
    }
  ]
})
