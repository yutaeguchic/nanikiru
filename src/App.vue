<template>
  <div id="app">
    <the-header/>

    <new-post
      :logined="$_logined"
    />

    <transition name="fadeIn">
      <router-view
        :users="$_users"
        :user="$_user"
        :posts="$_posts"
        :answers="$_answers"
        :comments="$_comments"
        :scores="$_scores"
        :uid="$_uid"
        :pageId="$_pageId"
        :logined="$_logined"
        :notfound="notfound"
        @existId="$_existId($event)"
        @setDb="$_setDb($event)"
      />
    </transition>

    <account
      :user="$_user"
      :uid="$_uid"
      :logined="$_logined"
      @login="$_login()"
    />

    <the-footer
      :logined="$_logined"
      @logout="$_logout()"
    />

    <modal
      @login="$_login()"
    />

    <transition name="fadeInDown">
      <div v-show="loader.show" class="m-overlay">
        <div class="m-loader">loading...</div>
      </div>
    </transition>

  </div>
</template>

<script>
import Data from '@/components/mixin/Data.js'
import {EventBus} from '@/components/libs/EventBus.js'
import TheHeader from '@/components/TheHeader.vue'
import NewPost from '@/components/btns/NewPost.vue'
import Account from '@/components/btns/Account.vue'
import TheFooter from '@/components/TheFooter.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    NewPost,
    Account,
    TheFooter,
    Modal,
  },
  mixins: [Data],
  data() {
    return {
      loader: {
        show: true
      },
      notfound: {
        url: false
      }
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.actionParam()
        this.$SmoothScroll(document.body, 400)
      }
    }
  },
  mounted() {
    EventBus.$on('loading', (boolean)=> this.loading(boolean))
    EventBus.$on('toNotfound', (url)=> this.toNotfound(url))
    EventBus.$on('resetNotfound', (url)=> this.resetNotfound(url))
  },
  methods: {
    //callMethod(name) {this[name]()},
    actionParam() {
      if(window.location.search === '?modal') {
        EventBus.$emit('showModal')
        history.replaceState('', '', '/')
      }
    },
    loading(boolean) {
      this.loader.show = boolean
    },
    toNotfound(url) {
      this.notfound.url = url
      this.$router.replace('/notfound')
    },
    resetNotfound() {
      this.notfound.url = null
    }
  }
}
</script>