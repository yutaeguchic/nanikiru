<template>
  <div class="home">
    <h2 class="m-ttl">NANIKIRU New</h2>
    <div class="archive">
      <div v-for="(post, index) of posts" :key="index" class="archive__post">
        <Cassette :post="post" design="archive"/>
      </div>
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
  mounted() {
    if(window.location.search === '?modal') this.setModal()
  },
  methods: {
    setModal() {
      this.$emit('modal')
      history.replaceState('', '', '/')
    }
  }
}
</script>