import firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import('../views/Notfound.vue')
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
    path: '/answer/:id',
    name: 'answer',
    component: () => import('../views/Answer.vue')
  },
  {
    path: '/user/:uid',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/*',
    name: 'notfound',
    component: () => import('../views/Notfound.vue')
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
