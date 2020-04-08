<template>
  <div>
    <ul class="pagination__btns">
      <li><i class="icon-double-left" :class="{disable: currentPage===1}" @click.prevent="goto($event, 1)"></i></li>
      <li><i class="icon-angle-left" :class="{disable: currentPage===1}" @click.prevent="goto($event, currentPage-1)"></i></li>
      <li><i class="icon-right" :class="{disable: currentPage===maxPage}" @click.prevent="goto($event, currentPage+1)"></i></li>
      <li><i class="icon-double-right" :class="{disable: currentPage===maxPage}" @click.prevent="goto($event, maxPage)"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: [
    'currentPage',
    'maxPage',
  ],
  methods: {
    goto($event, i) {
      console.log($event.target)
      if($event.target.classList.contains('disable')) {
        console.log('false')
        return false
      }
      this.$SmoothScroll(document.body, 400)
      this.$router.push(this.getPath(i)).catch(()=> {})
    },
    getPath(i) {
      const path = this.$route.fullPath
      if(/page=\d+/.test(path)) {
        return path.replace(/page=\d+/, 'page=' + i)
      }else if(/\?/.test(path)){
        return path + '&page=' + i
      }else {
        return path + '?page=' + i
      }
    }
  }
}
</script>