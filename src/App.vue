<template>
  <div id="app">
    <global-header/>

    <global-new-post
      :currentUser="currentUser"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="posts"
        :users.sync="users"
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
      redirectResult: false,
      docRefUsers: false,
      docRefPosts: false,
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
      posts: false,
      users: {},
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
    setDocRefs() {
      this.docRefUsers = firebase.firestore().collection('users')
      this.docRefPosts = firebase.firestore().collection('posts').orderBy("c", "desc")
    },
    setDb() {
      this.setUsers()
      this.setPosts()
    },
    setCurrentUser() {
      firebase.auth().onAuthStateChanged(this.asyncHandler)
    },
    async asyncHandler(user) {
      await this.setDocRefs()
      await this.setDb()
      if(user) {
        await this.setRedirectResult()
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
        await this.mergeDbUser(this.currentUser.uid)
      }
      this.loader.show = await false
    },
    async mergeDbUser(uid) {
      const docRefUser = this.docRefUsers.doc(uid)
      const docSnapshot = await docRefUser.get()
      if(docSnapshot.exists) { //DB登録済み
        const docData = await docSnapshot.data()
        this.currentUser.db.username = await docData.username
        this.currentUser.db.answers = await docData.answers
        this.currentUser.db.plofile = await docData.plofile
        if(this.redirectResult.user) { //データ更新
          this.currentUser.db.username = await this.redirectResult.additionalUserInfo.username
          if(this.currentUser.db.username != docData.username || this.currentUser.db.displayName != docData.displayName || this.currentUser.db.photoURL != docData.photoURL) {
            const updateData = await {
              db: this.currentUser.db
            }
            await docRefUser.update(updateData)
          }
        }
      }else { //DB未登録
        if(this.redirectResult.user) {
          this.currentUser.db.username = await this.redirectResult.additionalUserInfo.username
        }
        await docRefUser.set(this.currentUser.db, {merge: true})
      }
      this.currentUser.login = await true
    },
    async setRedirectResult() {
      const result = firebase.auth().getRedirectResult().catch(error => console.log('error: ' + error))
      if(result) {
        this.redirectResult = await result
        this.loginModal()
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
      this.docRefUser.doc(answer.postId).update({
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