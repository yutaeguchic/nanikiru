<template>
  <div id="app">
    <the-header/>

    <new-post/>

    <transition name="fadeIn">
      <router-view
        @setDb="setDb($event)"
      />
    </transition>

    <account/>

    <the-footer/>

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
import {EventBus} from '@/components/libs/EventBus.js'
import {Database} from '@/components/libs/Database.js'
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
  data() {
    return {
      loader: {
        show: true
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
  async created() {
    await Database.initDb()
    await Database.setLoginResult()
    await Database.initUser()
  },
  mounted() {
    EventBus.$on('loading', (boolean)=> this.loading(boolean))
  },
  methods: {
    //callMethod(name) {this[name]()},
    actionParam() {
      if(window.location.search === '?modal') {
        EventBus.$emit('showModal')
        history.replaceState('', '', '/')
      }
    },
    login() {
      Database.login()
    },
    loading(boolean) {
      this.loader.show = boolean
    }
  }
}
</script>