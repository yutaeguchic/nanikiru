<template>
  <div id="app">
    <global-header/>

    <global-new-post
      :currentUser="currentUser"
      :modalText="modalText"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="db.posts"
        :users.sync="db.users"
        :modalText="modalText"
        @setDbPosts="setDbPosts()"
      />
    </transition>

    <global-account
      :currentUser="currentUser"
      @login="login()"
    />

    <global-footer
      :currentUser="currentUser"
      @logout="logout()"
    />

    <transition name="fadeInDown">
      <modal
        v-show="modal.able"
        :modal="modal"
        @submit="callMethod(modal.funcName)"
      />
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
import GlobalNewPost from '@/components/btns/GlobalNewPost.vue'
import GlobalAccount from '@/components/btns/GlobalAccount.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'
import modalText from '@/assets/data/modalText.json'

export default {
  name: 'home',
  components: {
    GlobalHeader,
    GlobalNewPost,
    GlobalAccount,
    GlobalFooter,
    Modal,
    Loader
  },
  data() {
    return {
      db: {
        redirectResult: null,
        docRef: {
          users: null,
          posts: null,
          answers: null
        },
        users: {},
        posts: {},
        answers: {}
      },
      currentUser: {
        login: null,
        uid: null,
        db: {
          username: null,
          displayName: null,
          photoURL: null,
          plofile: null
        }
      },
      currentAnswer: null,
      modal: {
        able: false,
        text: {
          title: null,
          content: null,
          submit: null
        },
        funcName: null
      },
      modalText: modalText,
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
    this.actionParam()
    console.log(this.db.answers)
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
          login: null,
          uid: null,
          db: {
            username: null,
            displayName: null,
            photoURL: null,
            plofile: null
          }
        }
        this.modal = {
          able: true,
          text: this.modalText.general.logout,
          funcName: null
        }
      })
    },
    setCurrentUser() {
      const setDocRefs = ()=> {
        this.db.docRef.users = firebase.firestore().collection('users')
        this.db.docRef.posts = firebase.firestore().collection('posts').orderBy("c", "desc")
        this.db.docRef.answers = firebase.firestore().collection('answers')
      }
      const setDb = ()=> {
        this.setDbUsers()
        this.setDbPosts()
        this.setDbAnswers()
      }
      const setRedirectResult = async ()=> {
        const result = await firebase.auth().getRedirectResult().catch(error => console.log('error: ' + error))
        if(result.user) {
          await this.loginModal()
          this.db.redirectResult = await result
        }
      }
      const mergeDbUser = async (uid)=> {
        const docUser = this.db.docRef.users.doc(uid)
        const docSnapshot = await docUser.get()
        if(docSnapshot.exists) { //DB登録済み
          const docData = await docSnapshot.data()
          this.currentUser.db.username = await docData.username
          this.currentUser.db.plofile = await docData.plofile
          if(this.db.redirectResult) { //データ更新
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
            if(this.currentUser.db.username != docData.username || this.currentUser.db.displayName != docData.displayName || this.currentUser.db.photoURL != docData.photoURL) {
              const updateData = await {
                db: this.currentUser.db
              }
              await docUser.set(updateData)
            }
          }
        }else { //DB未登録
          if(this.db.redirectResult.user) {
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
          }
          await docUser.set(this.currentUser.db)
        }
        this.currentUser.login = await true
      }
      const handler = async (user)=> {
        await setDocRefs()
        await setDb()
        if(user) {
          await setRedirectResult()
          this.currentUser = await {
            login: false,
            uid: user.uid + '',
            db: {
              username: null,
              displayName: user.displayName,
              photoURL: user.photoURL.replace('_normal', ''),
              plofile: null
            }
          }
          await mergeDbUser(this.currentUser.uid)
        }
        this.loader.show = await false
      }
      firebase.auth().onAuthStateChanged(handler)
    },
    setDbUsers() {
      this.db.docRef.users.get().then(snapshot => {
        let users = {}
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            users[doc.id] = await doc.data()
          })
        }
      this.db.users = users
      })
    },
    setDbPosts() {
      let posts = {}
      this.db.docRef.posts.get().then(snapshot => {
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            posts[doc.id] = await doc.data()
          })
        }
      this.db.posts = posts
      })
    },
    setDbAnswers() {
      let answers = {}
      this.db.docRef.answers.get().then(snapshot => {
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            answers[doc.id] = await doc.data()
          })
        }
      this.db.answers = answers
      })
    },
    postAnswer() {
      let data = {
        timestamp: this.currentAnswer.timestamp,
        card: this.currentAnswer.card
      }
      this.db.answers[this.currentAnswer.postId] = this.db.answers[this.currentAnswer.postId] || {}
      this.db.answers[this.currentAnswer.postId] = data
      console.log(this.db.answers)
    },
    loginModal() {
      this.modal = {
        able: true,
        text: this.modalText.general.login,
        funcName: null
      }
    },
    actionParam() {
      if(window.location.search === '?modal') {
        this.modal.able = true
        history.replaceState('', '', '/')
      }
    }
  }
}
</script>