<template>
  <div id="app">
    <global-header/>

    <router-view
      :account="user"
      @modal="modal.show = true"
    />

    <global-account
      :account="user"
    />

    <global-footer/>

    <transition name="fadeDown">
      <modal
        v-show="modal.show"
        @close="modal.show=false"
      >
        <template v-slot:header>
          <h1 class="m-ttl">{{modal.ttl}}</h1>
        </template>
        <template v-slot:content>
          <div v-html="modal.content"></div>
        </template>
      </modal>
    </transition>

    <transition name="fadeDown">
      <Loader
        v-show="loader.show"
      />
    </transition>

  </div>
</template>

<script>
import firebase from 'firebase'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalAccount from '@/components/GlobalAccount.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'home',
  components: {
    GlobalHeader,
    GlobalAccount,
    GlobalFooter,
    Modal,
    Loader
  },
  data() {
    return {
      user: false,
      LoginRequiredPages: ['/post'],
      modal: {
        show: false,
        ttl: '',
        content: ''
      },
      loader: {
        show: false
      }
    }
  },
  created() {
    this.getUser(false)
  },
  watch: {
    '$route': 'loginCheck'
  },
  methods: {
    getUser(loginCheck) {
      if(this.user) return false
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          const dbUser = firebase.firestore().collection('users').doc(user.uid)
          dbUser.get().then(docSnapshot => {
            let data = {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL.replace('_normal', ''),
              twid: docSnapshot.get('twid')
            }
            this.user = data
          })
        }else {
          this.user = false //ログアウト判定で必要
          let path = this.$route.path
          if(loginCheck && this.LoginRequiredPages.includes(path)) {
            this.$router.push('/')
          }
        }
      })
    },
    loginCheck() {
      this.getUser(true)
    }
  }
}
</script>