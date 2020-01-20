<template>
  <div id="app">
    <global-header/>
    <router-view :account="user"/>
    <global-account :account="user"/>
    <global-footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalAccount from '@/components/GlobalAccount.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

export default {
  name: 'home',
  components: {
    GlobalHeader,
    GlobalAccount,
    GlobalFooter
  },
  data() {
    return {
      user: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const dbUser = firebase.firestore().collection('users').doc(user.uid)
        dbUser.get().then(docSnapshot => {
          let data = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL.replace("_normal", ""),
            twid: docSnapshot.get('twid')
          }
          this.user = data
        })
      }else {
        this.user = false //ログアウト判定で必要
      }
    })
  }
}
</script>