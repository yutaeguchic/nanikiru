<template>
  <div v-if="user">
    <div class="profile">
      <div class="profile__icon"><router-link tag="a" :to="'/user/'+uid" title="user page"><img :src="user.photoURL" :alt="user.displayName"></router-link></div>
      <div class="profile__name">{{user.displayName}}<br>(<a :href="twUrl" target="_blank" title="twitter">@{{user.username}}</a>)</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'user',
    'uid'
  ],
  computed: {
    twUrl() {
      return 'https://twitter.com/' + this.user.username
    }
  }
}
</script>