<template>
  <div class="content-home">

    <breadcrumb/>

    <h2 class="m-ttl--page">NANIKIRU 新着</h2>
    <div class="query">
      <Cassette v-for="(key, i) of getPostKeys.slice(0, postCount)" :key="i" :post="posts[key]" :postId="key" :users="users"/>
    </div>
  </div>
</template>

<script>
import Cassette from '@/components/Cassette.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'Home',
  components: {
    Breadcrumb,
    Cassette
  },
  props: ['posts', 'users'],
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