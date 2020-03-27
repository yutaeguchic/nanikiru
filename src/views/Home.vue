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
      />
    </div>
  </div>
</template>

<script>

const POST_COUNT = 20

import Cassette from '@/components/cassette/Archive.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import {Database} from '@/components/libs/Database.js'

export default {
  name: 'Home',
  components: {
    Cassette,
    Breadcrumb
  },
  computed: {
    postCount() {
      return POST_COUNT
    },
    posts() {
      return Database.posts
    },
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