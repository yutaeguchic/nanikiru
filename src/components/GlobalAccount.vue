<template>
  <div class="account">
    <div v-if="currentUser.login" class="account__display" @click="logout"><img :src="currentUser.photoURL" :alt="currentUser.displayName"></div>
    <div v-else class="account__btn" title="login" @click="login"><i class="icon-twitter"></i></div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'account',
  props: ['currentUser'],
  data() {
    return {
      uid : false
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout() {
      this.$parent.currentUser.login = false
      firebase.auth().signOut()
    }
  }
}
</script>