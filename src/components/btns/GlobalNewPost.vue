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
        const data = {
          title: 'ログインして下さい',
          content: '<p>NANIKIRUの投稿にはTwitterアカウントによる承認が必要です</p>',
          submit: true,
          button: 'ログインする',
          funcName: 'login',
          show: true
        }
        this.$emit('modal', data)
      }
    }
  }
}
</script>