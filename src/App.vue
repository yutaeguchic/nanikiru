<template>
  <div id="app">
    <global-header/>

    <router-view
      :currentUser="currentUser"
      :posts="posts"
      :users="users"
      @modal="modal.show = true"
    />

    <global-account
      :currentUser="currentUser"
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
      currentUser: false,
      posts: [],
      users: [],
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
    if(!this.currentUser) this.fetchUser()
  },
  firestore() {
    return {
      posts: firebase.firestore().collection('posts'),
      users: firebase.firestore().collection('users')
    }
  },
  methods: {
    fetchUser() {
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
            this.currentUser = data
          })
        }else {
          this.currentUser = false //ログアウト判定で必要
        }
      })
    },
    updateCurrentUser() {
      console.log('up')
    }
  }
}
</script>