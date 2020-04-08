const POSTS_PER_PAGE = 2 //表示件数

export default {
  computed: {
    $_query() {
      return this.$route.query
    },
    $_currentPage() {
      if(this.$_query.page) {
        if(+this.$_query.page) {
          return +this.$_query.page
        }else {
          this.$router.replace('/notfound')
        }
      }else {
        return 1
      }
    },
    $_postsPerPage() {
      return POSTS_PER_PAGE
    },
    $_postKeys() {
      if(this.$_.size(this.posts) < 1) return false
      return this.$_(this.posts).keys().orderBy([(key)=> this.posts[key].c], ['desc']).value()
    },
    $_maxPage() {
      return (this.$_postKeys.length / POSTS_PER_PAGE)
    },
    $_start() {
      return (this.$_currentPage - 1) * POSTS_PER_PAGE
    }
  }
}