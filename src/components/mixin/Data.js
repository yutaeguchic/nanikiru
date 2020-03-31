import {Database} from '@/components/libs/Database.js'
import {EventBus} from '@/components/libs/EventBus.js'

export default {
  computed: {
    $_users() {
      return Database.users
    },
    $_user() {
      return Database.user
    },
    $_uid() {
      return Database.uid
    },
    $_posts() {
      return Database.posts
    },
    $_answers() {
      return Database.answers
    },
    $_comments() {
      return Database.comments
    },
    $_scores() {
      return Database.scores
    },
    $_pageId() {
      return this.$route.params['id'] || null
    },
    $_logined() {
      return Database.logined
    }
  },
  async created() {
    await Database.initDb()
    await Database.setLoginResult()
    await Database.initUser()
  },
  mounted() {
    EventBus.$on('setDb', (table)=> this.$_setDb(table))
  },
  methods: {
    $_setDb(table) {
      Database.setDb(table)
    },
    $_existId(table) {
      if(!this['$_' + table][this.$_pageId]) EventBus.$emit('toNotfound', this.$route.fullPath)
    },
    $_login() {
      Database.login()
    },
    $_logout() {
      Database.logout()
    }
  }
}