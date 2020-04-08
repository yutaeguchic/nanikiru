//import {EventBus} from '@/components/libs/EventBus.js'

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
      return Object.keys(this.posts).sort((a, b)=> {
        const _a = this.posts[a].c
        const _b = this.posts[b].c
        if (_a === _b) return 0
        return (_a > _b) ? -1 : 1
      })
    },
    $_maxPage() {
      return (this.$_postKeys.length / POSTS_PER_PAGE)
    },
    $_start() {
      return (this.$_currentPage - 1) * POSTS_PER_PAGE
    }
  },
  mounted() {
    //console.log(this.$_maxPage)
  }
}