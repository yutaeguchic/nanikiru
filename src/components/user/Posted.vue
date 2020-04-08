<template>
  <div class="query">
    <template v-if="postKeys">
      <Cassette
        v-for="(key, i) of postKeys.slice(0, postCount)"
        :key="i"
        :post="posts[key]"
        :postId="key"
        :users="users"
        :uid="uid"
        :answers="answers"
      />
    </template>
    <template v-else>
      <div class="m-section">投稿はありません。</div>
    </template>
  </div>
</template>

<script>
const POST_COUNT = 10

import Cassette from '@/components/cassette/Archive.vue'

export default {
  components: {
    Cassette
  },
  props: [
    'users',
    'uid',
    'posts',
    'pageId',
    'answers'
  ],
  computed: {
    postCount() {
      return POST_COUNT
    },
    postKeys() {
      if(!this.posts) return false
      return this.$_(this.posts).keys().filter((key)=> this.posts[key].a === this.pageId).orderBy([(key)=> this.posts[key].c], ['desc']).value()
    }
  }
}
</script>