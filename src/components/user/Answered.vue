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
      <div class="m-section">回答はありません。</div>
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
      if(this.$_.size(this.answers) < 1) return false
      const answered = this.$_(this.answers).mapValues((a)=> a[this.pageId]).pickBy(this.$_.identity).keys().value()
      if(answered.length) {
        return this.$_.orderBy(answered, [(a)=> this.$_.values(a).timestamp, ['desc']])
      }else {
        return false
      }
    }
  }
}
</script>