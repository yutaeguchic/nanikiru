<template>
  <div class="account">
    <div v-if="logined" class="account__display" @click="submit()"><img :src="user.photoURL" :alt="user.displayName"></div>
    <div v-else class="account__btn" title="login" @click="login()"><i class="icon-twitter"></i></div>
  </div>
</template>

<script>
import {Database} from '@/components/libs/Database.js'

export default {
  name: 'account',
  computed: {
    logined() {
      return Database.logined
    },
    user() {
      return Database.user
    }
  },
  methods: {
    login() {
      Database.login()
    },
    submit() {
      this.$router.push('/user/'+Database.uid).catch(()=> {})
    }
  }
}
</script>