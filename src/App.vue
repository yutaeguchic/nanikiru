<template>
  <div id="app">
    <global-header/>

    <global-new-post
      :currentUser="currentUser"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="db.posts"
        :users.sync="db.users"
        @setPosts="setPosts()"
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
      currentUser: {
        login: false,
        uid: false,
        db: {
          username: false,
          displayName: false,
          photoURL: false,
          answers: {},
          plofile: ''
        }
      },
      currentAnswer: {
        postId: '',
        timestamp: false,
        uid: '',
        card: false
      },
      db: {
        redirectResult: false,
        docRef: {
          users: false,
          posts: false
        },
        users: {},
        posts: {}
      },
      modal: {
        able: false,
        page: '',
        tag: '',
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
  mounted() {
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
          uid: false,
          db: {
            username: false,
            displayName: false,
            photoURL: false,
            answers: {},
            plofile: ''
          }
        }
        this.modal = {
          able: true,
          page: 'general',
          tag: 'logout',
          funcName: false
        }
      })
    },
    setCurrentUser() {
      const setDocRefs = ()=> {
        this.db.docRef.users = firebase.firestore().collection('users')
        this.db.docRef.posts = firebase.firestore().collection('posts').orderBy("c", "desc")
      }
      const setDb = ()=> {
        this.setDbUsers()
        this.setDbPosts()
      }
      const setRedirectResult = async ()=> {
        const result = firebase.auth().getRedirectResult().catch(error => console.log('error: ' + error))
        if(result) {
          this.db.redirectResult = await result
          this.loginModal()
        }
      }
      const mergeDbUser = async (uid)=> {
        const userData = this.db.docRef.users.doc(uid)
        const docSnapshot = await userData.get()
        if(docSnapshot.exists) { //DB登録済み
          const docData = await docSnapshot.data()
          this.currentUser.db.username = await docData.username
          this.currentUser.db.answers = await docData.answers
          this.currentUser.db.plofile = await docData.plofile
          if(this.db.redirectResult.user) { //データ更新
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
            if(this.currentUser.db.username != docData.username || this.currentUser.db.displayName != docData.displayName || this.currentUser.db.photoURL != docData.photoURL) {
              const updateData = await {
                db: this.currentUser.db
              }
              await userData.update(updateData)
            }
          }
        }else { //DB未登録
          if(this.db.redirectResult.user) {
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
          }
          await userData.set(this.currentUser.db, {merge: true})
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
            uid: String(user.uid),
            db: {
              username: false,
              displayName: user.displayName,
              photoURL: user.photoURL.replace('_normal', ''),
              answers: {},
              plofile: ''
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
    async postAnswer() {
      await this.dbSetAnswerUser()
      await this.dbSetAnswerPost()
    },
    dbSetAnswerUser(answer) {
      const answers = this.currentUser.answer
      answers[answer.postId] = {
        timestamp: answer.timestamp,
        answer: answer.card
      }
      this.db.docRef.users.doc(answer.postId).update({
        answers: answers
      })
    },
    dbSetAnswerPost(answer) {
      const answers = this.posts[answer.postId].answers
      const data = {
        uid: answer.uid,
        answer: answer.card
      }
      console.log(answers, data)
    },
    loginModal() {
      this.modal = {
        able: true,
        page: 'general',
        tag: 'login',
        funcName: false
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