<template>
  <div class="single">
    <div>{{posts[postId]}}</div>
  </div>
</template>

<script>
export default {
  name: 'single',
  props: ['posts', 'users'],
  data() {
    return {
      postId: false
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
  }
}
</script>