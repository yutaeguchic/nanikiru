import firebase from 'firebase'
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
    path: '/post/new',
    name: 'post',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Post.vue')
  },
  {
    path: '/post/:id',
    name: 'single',
    component: () => import('../views/Single.vue')
  },
  {
    path: '/*',
    name: 'notfound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//login check
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) next()
      else next({name: 'home'})
    })
  }
  next()
})

export default router
