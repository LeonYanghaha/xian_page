import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Food from './views/Food.vue'
import Clothes from './views/Clothes.vue'
import Electric from './views/Electric.vue'
import User from './views/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/clothes',
      name: 'clothes',
      component: Clothes
    },
    {
      path: '/electric',
      name: 'electric',
      component: Electric
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
