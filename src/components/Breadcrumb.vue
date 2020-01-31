<template>
  <ul class="breadcrumb">
    <li @click="goHome()"><i class="icon-home"></i>HOME</li>
    <li v-if="text"><i class="icon-right"></i>{{text}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['text'],
  methods: {
    goHome() {
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>