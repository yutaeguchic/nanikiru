import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase'
import './assets/css/style.css'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
const firebaseConfig = {
  apiKey: "AIzaSyDjK08oTr8azL-AxP1aqCqnwzCgM-jv4dA",
  authDomain: "nanikiru-4db40.firebaseapp.com",
  databaseURL: "https://nanikiru-4db40.firebaseio.com",
  projectId: "nanikiru-4db40",
  storageBucket: "nanikiru-4db40.appspot.com",
  messagingSenderId: "529523796832",
  appId: "1:529523796832:web:4122e63a0157702cc8cc05",
  measurementId: "G-ZQQGPWPRWL"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')