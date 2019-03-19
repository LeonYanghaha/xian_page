import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Food from './views/Food.vue';
import Clothes from './views/Clothes.vue';
import Electric from './views/Electric.vue';
import User from './views/User.vue';
import About from './views/About.vue';
import Product from './views/Product.vue';

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
      component: About
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/product',
      name: 'product',
      component: Product
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
});
