<template>
  <div class="newPostBtn" @click="goNewPost()" title="add post"><i class="icon-pen"></i></div>
</template>

<script>
export default {
  name: 'GlobalNewPost',
  props: ['currentUser', 'modalText'],
  methods: {
    goNewPost() {
      if(this.currentUser.login) {
        this.$router.push('/post/new')
      }else {
        this.$parent.modal = {
          able: true,
          text: this.modalText.newPost.requireLogin,
          funcName: 'login'
        }
      }
    }
  }
}
</script>