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
      const answered = Object.keys(this.answers).filter((id)=>{
        return this.answers[id][this.pageId]
      })
      if(answered.length) {
        return answered.sort((a, b)=> {
          const _a = this.posts[a].c
          const _b = this.posts[b].c
          if (_a === _b) return 0
          return (_a > _b) ? -1 : 1
        })
      }else  {
        return false
      }
    }
  }
}
</script>