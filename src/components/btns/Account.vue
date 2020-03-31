<template>
  <div class="account">
    <div v-if="logined" class="account__display" @click="submit()"><img :src="user.photoURL" :alt="user.displayName"></div>
    <div v-else class="account__btn" title="login" @click="login()"><i class="icon-twitter"></i></div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: [
    'user',
    'uid',
    'logined'
  ],
  methods: {
    login() {
      this.$emit('login')
    },
    submit() {
      this.$router.push('/user/'+this.uid).catch(()=> {})
    }
  }
}
</script>