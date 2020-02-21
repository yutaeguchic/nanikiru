<template>
  <div id="app">
    <global-header/>

    <new-post
      :currentUser="currentUser"
    />

    <transition name="fadeIn">
      <router-view
        :currentUser="currentUser"
        :posts.sync="db.posts"
        :users.sync="db.users"
        :answers.sync="db.answers"
        @setDbPosts="setDbPosts()"
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
      @submit="callMethod(modal.funcName)"
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
  name: 'home',
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
          login: null,
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
      const setDocRefs = ()=> {
        this.db.docRef.users = firebase.firestore().collection('users')
        this.db.docRef.posts = firebase.firestore().collection('posts').orderBy("c", "desc")
        this.db.docRef.answers = firebase.firestore().collection('answers')
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
        if(docSnapshot.exists) {
          const docData = await docSnapshot.data()
          this.currentUser.db.username = await docData.username
          this.currentUser.db.plofile = await docData.plofile
          if(this.db.redirectResult) {
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
            if(this.currentUser.db.username != docData.username || this.currentUser.db.displayName != docData.displayName || this.currentUser.db.photoURL != docData.photoURL) {
              const updateData = await {
                db: this.currentUser.db
              }
              await docUser.set(updateData)
            }
          }
        }else { //DBÎ´µÇåh
          if(this.db.redirectResult.user) {
            this.currentUser.db.username = await this.db.redirectResult.additionalUserInfo.username
          }
          await docUser.set(this.currentUser.db)
        }
        this.currentUser.login = await true
      }
      const handler = async (user)=> {
        await setDocRefs()
        await this.setDb('users')
        await this.setDb('posts')
        await this.setDb('answers')
        await console.log(this.db)
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
    setDb(name) {
      this.db.docRef[name].get().then(snapshot => {
        let data = {}
        if(!snapshot.empty) {
          snapshot.forEach(async doc => {
            data[doc.id] = await doc.data()
          })
        }
        this.db[name] = data
      })
    },
    postAnswer() {
      const answer = this.currentAnswer
      const data = {}
      data[answer.uid] = {
        timestamp: answer.timestamp,
        card: answer.card
      }
      this.db.answers[answer.postId] = this.db.answers[answer.postId] || {}
      this.db.answers[answer.postId][answer.uid] = data[answer.uid]
      this.db.docRef.answers.doc(answer.postId).set(data,
         {merge: true}).then(()=> {
          this.$router.push('/answer/' + answer.postId)
         })
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