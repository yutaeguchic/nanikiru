<template>
  <div class="account">
    <div v-if="currentUser.login" class="account__display" @click="jump()"><img :src="currentUser.db.photoURL" :alt="currentUser.db.displayName"></div>
    <div v-else class="account__btn" title="login" @click="$emit('login')"><i class="icon-twitter"></i></div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: ['currentUser'],
  data() {
    return {
      uid : false
    }
  },
  methods: {
    jump() {
      const target = '/user/'+this.currentUser.uid
      if(target != this.$route.path) this.$router.push('/user/'+this.currentUser.uid)
    }
  }
}
</script>