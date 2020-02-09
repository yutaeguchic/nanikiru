<template>
  <div class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>
    <div>{{post}}</div>
    <div>---</div>
    <div>{{currentUser}}</div>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'answer',
  components: {
    Breadcrumb
  },
  props: ['posts', 'users', 'currentUsers'],
  data() {
    return {
      postId: '',
      post: {}
    }
  },
  watch: {
    posts() {
      if(this.posts) this.setPost()
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
    if(this.posts) this.setPost()
  },
}
</script>