<template>
  <div class="account">
    <div v-if="account" class="account__display" @click="logout"><img :src="account.photoURL" :alt="account.displayName"></div>
    <div v-else class="account__btn" title="login" @click="login"><i class="icon-twitter"></i></div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'account',
  props: ['account'],
  data() {
    return {
      uid : false
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result)=> {
        this.uid = String(result.user.uid)
        const data = {
          twid: result.additionalUserInfo.username,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        }
        this.set(data)
      })
    },
    logout() {
      firebase.auth().signOut()
    },
    set(data) {
      const self = this
      firebase.firestore().collection('users').doc(self.uid).set(data, {merge: true})
    }
  }
}
</script>