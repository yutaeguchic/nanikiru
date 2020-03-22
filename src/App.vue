<template>
  <div id="app">
    <global-header/>

    <new-post
      :isLogin="currentUser.login"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="posts"
        :users.sync="users"
        :answers.sync="answers"
        :comments.sync="comments"
        :scores.sync = "scores"
        @setDb="setDb($event)"
      />
    </transition>

    <account
      :currentUser="currentUser"
      @login="login()"
    />

    <global-footer
      :currentUser="currentUser"
      @logout="logout()"
    />

    <modal
      @submit="callMethod($event)"
    />

    <transition name="fadeInDown">
      <Loader
        v-show="loader.show"
      />
    </transition>

  </div>
</template>

<script>
import firebase from 'firebase'
import {EventBus} from '@/components/libs/EventBus.js'
import GlobalHeader from '@/components/GlobalHeader.vue'
import NewPost from '@/components/btns/NewPost.vue'
import Account from '@/components/btns/Account.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'App',
  components: {
    GlobalHeader,
    NewPost,
    Account,
    GlobalFooter,
    Modal,
    Loader
  },
  data() {
    return {
      users: {},
      posts: {},
      answers: {},
      comments: {},
      scores: {},
      redirectResult: null,
      docRef: {},
      currentUser: {
        login: null,
        uid: null,
        db: {
          username: null,
          displayName: null,
          photoURL: null,
          plofile: null,
        }
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
  mounted() {
    EventBus.$on('login', ()=> {
      this.login()
    })
    EventBus.$on('setDb', (name)=> {
      this.setDb(name)
    })
    this.actionParam()
  },
  watch: {
    '$route': function(to, from) {
      if (to.path !== from.path) {
        this.actionParam()
        this.$SmoothScroll(document.body, 400)
      }
    }
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
      firebase.auth().signOut().then(()=> {
        this.currentUser = {
          login: false,
          uid: null,
          db: {
            username: null,
            displayName: null,
            photoURL: null,
            plofile: null
          }
        }
        const data = {
          able: true,
          text: ['general', 'logout'],
          funcName: null
        }
        EventBus.$emit('setModal', data)
      })
    },
    setCurrentUser() {
      const setRedirectResult = async ()=> {
        const result = await firebase.auth().getRedirectResult().catch(error => console.log('error: ' + error))
        if(result.user) {
          await this.loginModal()
          this.redirectResult = await result
        }
      }
      const mergeDbUser = async (uid)=> {
        const docUser = this.docRef.users.doc(uid)
        const docSnapshot = await docUser.get()
        if(docSnapshot.exists) {
          const docData = await docSnapshot.data()
          this.currentUser.db.username = await docData.username
          this.currentUser.db.plofile = await docData.plofile
          if(this.redirectResult) {
            this.currentUser.db.username = await this.redirectResult.additionalUserInfo.username
            await this.updateDbUser(docUser, docData)
          }
        }else {
          if(this.redirectResult.user) {
            this.currentUser.db.username = await this.redirectResult.additionalUserInfo.username
          }
          await docUser.set(this.currentUser.db)
        }
        this.currentUser.login = await true
      }
      const handler = async (user)=> {
        await this.setDb('users')
        await this.setDb('posts')
        await this.setDb('answers')
        await this.setDb('comments')
        await this.setDb('scores')
        if(user) {
          await setRedirectResult()
          this.currentUser.uid = await user.uid + ''
          this.currentUser.db.displayName = await user.displayName
          this.currentUser.db.photoURL = await user.photoURL.replace('_normal', '')
          await mergeDbUser(this.currentUser.uid)
        }
        this.loader.show = await false
      }
      firebase.auth().onAuthStateChanged(handler)
    },
    setDb(name) {
      this.docRef[name] = firebase.firestore().collection(name)
      this.docRef[name].get().then(snapshot => {
        let data = {}
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            data[doc.id] = await doc.data()
          })
        }
        this[name] = data
      })
    },
    async updateDbUser(docUser, docData) {
      if(this.currentUser.db.username != docData.username) {
        await docUser.doc('username').set(this.currentUser.db.username)
      }else if(this.currentUser.db.displayName != docData.displayName) {
        await docUser.doc('displayName').set(this.currentUser.db.displayName)
      }else if(this.currentUser.db.photoURL != docData.photoURL) {
        await docUser.doc('photoURL').set(this.currentUser.db.photoURL)
      }
    },
    loginModal() {
      const data = {
        able: true,
        text: ['general', 'login'],
        funcName: null
      }
      EventBus.$emit('setModal', data)
    },
    actionParam() {
      if(window.location.search === '?modal') {
        EventBus.$emit('showModal')
        history.replaceState('', '', '/')
      }
    }
  }
}
</script>