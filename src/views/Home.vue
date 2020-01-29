<template>
  <div class="home">
    <h2 class="m-ttl--page">NANIKIRU New</h2>
    <div class="query">
      <Cassette v-for="(key, i) of getPostKeys.slice(0, postCount)" :key="i" :post="posts[key]" :postId="key" :users="users"/>
    </div>
  </div>
</template>

<script>
import Cassette from '@/components/Cassette.vue'
export default {
  name: 'home',
  props: ['posts', 'users'],
  components: {
    Cassette
  },
  data() {
    return {
      postCount: 10,
    }
  },
  mounted() {
    if(window.location.search === '?modal') this.setModal()
  },
  computed: {
    getPostKeys() {
      return Object.keys(this.posts)
    }
  },
  methods: {
    setModal() {
      this.$parent.modal.show = true
      history.replaceState('', '', '/')
    }
  }
}
</script>