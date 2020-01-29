<template>
  <div id="app">
    <global-header
      :currentUser="currentUser"
      @modal="setModal"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="posts"
        :users.sync="users"
        @modal="setModal"
        @setPosts="setPosts()"
      />
    </transition>

    <global-account
      :currentUser="currentUser"
      @login="login()"
      @logout="logout()"
    />

    <global-footer/>

    <transition name="fadeInDown">
      <modal
        v-show="modal.show"
        @close="closeModal()"
      >
        <template v-slot:header>
          <h1 class="m-ttl">{{modal.title}}</h1>
        </template>
        <template v-slot:content>
          <div class="m-modal__content" v-html="modal.content"></div>
          <transition name="fadeInDown">
            <div class="m-modal__btn" v-show="modal.submit"><button type="button" class="m-btn--able" @click="callMethod(modal.funcName)">{{modal.button}}</button></div>
          </transition>
        </template>
      </modal>
    </transition>

    <transition name="fadeInDown">
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
      dbUser: {
        displayName: false,
        photoURL: false,
        twid: false,
        answers: [],
        plofile: ''
      },
      docRefPosts: false,
      posts: false,
      users: {},
      modal: {
        show: false,
        title: '',
        content: '',
        button: '',
        submit: false,
        funcName: false
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
    callMethod(name) {
      return this[name]()
    },
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout() {
      this.currentUser.login = false
      firebase.auth().signOut()
    },
    setModal(data) {
      const self = this
      Object.keys(data).forEach((key) => {
        self.$set(self.modal, key, data[key])
      })
    },
    closeModal() {
      this.modal.show = false
      this.modal.submit = false
    },
    setCurrentUser() {
      firebase.auth().onAuthStateChanged(this.asyncHandler)
    },
    async asyncHandler(user) {
      await this.setDocRefs()
      await this.setUsers()
      this.setPosts()
      if(user) {
        this.currentUser.uid = await String(user.uid)
        this.currentUser.displayName = await user.displayName
        this.currentUser.photoURL = await user.photoURL.replace('_normal', '')
        await this.setDbUser(this.currentUser.uid)
      }
      this.loader.show = await false
    },
    setDocRefs() {
      this.docRefUsers = firebase.firestore().collection('users')
      this.docRefPosts = firebase.firestore().collection('posts').orderBy('timestamp')
    },
    async setDbUser(uid) {
      const docRefUser = this.docRefUsers.doc(uid)
      const docSnapshot = await docRefUser.get()
      if(docSnapshot.exists) {
        this.currentUser.twid = await docSnapshot.get('twid')
      }else {
        await this.setRedirectResult()
        if(this.redirectResult.user) {
          this.dbUser.twid = await this.redirectResult.additionalUserInfo.username
          this.dbUser.displayName = await this.currentUser.displayName
          this.dbUser.photoURL = await this.currentUser.photoURL
          await docRefUser.set(this.dbUser, {merge: true})
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
      let posts = {}
      this.docRefPosts.get().then(snapshot => {
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            posts[doc.id] = await doc.data()
          })
        }
      this.posts = posts
      })
    },
    postAnswer() {
      console.log('postAnswer')
    }
  }
}
</script>