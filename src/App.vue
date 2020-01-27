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
      redirectResult: false,
      currentUser: {
        login: false,
        uid: false,
        displayName: false,
        photoURL: false,
        twid: false
      },
      docRefUsers: false,
      docRefUser: false,
      dbUser: {
        displayName: false,
        photoURL: false,
        twid: false
      },
      posts: {},
      users: {},
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
    this.loader.show = true
    this.setCurrentUser()
  },
  methods: {
    setCurrentUser() {
      firebase.auth().onAuthStateChanged(this.asyncHandler)
    },
    async asyncHandler(user) {
      if(user) {
        this.currentUser.uid = await String(user.uid)
        this.currentUser.displayName = await user.displayName
        this.currentUser.photoURL = await user.photoURL.replace('_normal', '')
        await this.setDocRefUser(this.currentUser.uid)
        await this.setDbUser()
        await this.setUsers()
        this.setPosts()
      }
      this.loader.show = await false
    },
    async setDocRefUser(uid) {
      this.docRefUsers = await firebase.firestore().collection('users')
      this.docRefUser = await this.docRefUsers.doc(uid)
    },
    async setDbUser() {
      const docSnapshot = await this.docRefUser.get()
      if(docSnapshot.exists) {
        this.currentUser.twid = await docSnapshot.get('twid')
      }else {
        await this.setRedirectResult()
        if(this.redirectResult.user) {
          this.dbUser.twid = await this.redirectResult.additionalUserInfo.username
          this.dbUser.displayName = await this.currentUser.displayName
          this.dbUser.photoURL = await this.currentUser.photoURL
          await this.docRefUser.set(this.dbUser, {merge: true})
          this.currentUser.twid = await this.dbUser.twid
        }
      }
      this.currentUser.login = await true
    },
    async setRedirectResult() {
      const result = firebase.auth().getRedirectResult().catch(error => console.log('error: ' + error))
      if(result) {
        this.redirectResult = await result
      }
    },
    setUsers() {
      const self = this
      this.docRefUsers.get().then(snapshot => {
        let users = {}
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            users[doc.id] = await doc.data()
          })
        }
      self.users = users
      })
    },
    setPosts() {
      const docRefPosts = firebase.firestore().collection('posts')
      let posts = {}
      docRefPosts.get().then(snapshot => {
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            posts[doc.id] = await doc.data()
          })
        }
      this.posts = posts
      })
    }
  }
}
</script>