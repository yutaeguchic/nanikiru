import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {firestorePlugin} from 'vuefire'
import smoothScroll from 'vue-smoothscroll'
import firebase from 'firebase'

import './assets/css/style.css'
import './assets/css/transition.css'

Vue.config.productionTip = false
Vue.use(smoothScroll)
Vue.use(firestorePlugin)

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')