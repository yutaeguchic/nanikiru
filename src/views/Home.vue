<template>
  <div class="content-home">

    <breadcrumb/>

    <h2 class="m-ttl--page">NANIKIRU 新着</h2>

    <div class="query">
      <Cassette
        v-for="(key, i) of getPostKeys.slice(0, postCount)"
        :key="i"
        :post="posts[key]"
        :postId="key"
        :users="users"
        :isAnswer="(answers[key] && Object.keys(answers[key]).includes(currentUser.uid)) || false"
      />
    </div>
  </div>
</template>

<script>
import Cassette from '@/components/cassette/Archive.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'Home',
  components: {
    Cassette,
    Breadcrumb
  },
  props: ['posts', 'users', 'currentUser', 'answers'],
  data() {
    return {
      postCount: 10
    }
  },
  computed: {
    getPostKeys() {
      return Object.keys(this.posts).sort((a, b)=> {
        if(this.posts[a].c > this.posts[b].c) return -1
        if(this.posts[a].c < this.posts[b].c) return 1
        return 0
      })
    }
  }
}
</script>