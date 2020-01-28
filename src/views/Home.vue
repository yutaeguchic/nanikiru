<template>
  <div class="home">
    <h2 class="m-ttl--page">NANIKIRU New</h2>
    <div class="query">
      <Cassette v-for="(post, i) of postArray" :key="i" :post="post" :users="users"/>
    </div>
  </div>
</template>

<script>
import Cassette from '@/components/Cassette.vue'
export default {
  name: 'home',
  props: ['posts', 'users'],
  data() {
    return {
      postCount: 10,
      postArray: false
    }
  },
  components: {
    Cassette
  },
  mounted() {
    if(window.location.search === '?modal') this.setModal()
  },
  watch: {
    posts() {
      if(!this.postArray) {
        this.postArray = Object.values(this.posts)
      }
    }
  },
  methods: {
    setModal() {
      this.$emit('modal')
      history.replaceState('', '', '/')
    }
  }
}
</script>