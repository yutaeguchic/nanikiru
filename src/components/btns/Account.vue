<template>
  <div class="account">
    <div v-if="currentUser.login" class="account__display" @click="$router.push('/user/'+currentUser.uid)"><img :src="currentUser.db.photoURL" :alt="currentUser.db.displayName"></div>
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
  }
}
</script>