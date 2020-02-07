<template>
  <div class="newPostBtn" @click="goNewPost()" title="add post"><i class="icon-pen"></i></div>
</template>

<script>
export default {
  name: 'GlobalNewPost',
  props: ['currentUser'],
  methods: {
    goNewPost() {
      if(this.currentUser.login) {
        this.$router.push('/post/new')
      }else {
        this.$parent.modal = {
          able: true,
          page: 'general',
          tag: 'requireLogin',
          funcName: 'login'
        }
      }
    }
  }
}
</script>