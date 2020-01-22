<template>
  <div class="home">
    <h2>HOME</h2>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    console.log(this.$route.params)
  }
}

</script>