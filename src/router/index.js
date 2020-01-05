import Vue from 'vue'
import VueRouter from 'vue-router'
import vueSmoothScroll from 'vue-smoothscroll'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(vueSmoothScroll)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/Post.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
