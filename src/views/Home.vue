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
        :uid="uid"
        :answers="answers"
      />
    </div>
  </div>
</template>

<script>

const POST_COUNT = 20

import Cassette from '@/components/cassette/Archive.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'Home',
  components: {
    Cassette,
    Breadcrumb
  },
  props: [
    'users',
    'uid',
    'posts',
    'answers'
  ],
  computed: {
    postCount() {
      return POST_COUNT
    },
    getPostKeys() {
      return Object.keys(this.posts).sort((a, b)=> {
        const _a = this.posts[a].c
        const _b = this.posts[b].c
        if (_a === _b) return 0
        return (_a > _b) ? -1 : 1
      })
    }
  }
}
</script>