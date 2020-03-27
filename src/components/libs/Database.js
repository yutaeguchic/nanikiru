import Vue from 'vue'
import firebase from 'firebase'
import {EventBus} from '@/components/libs/EventBus.js'

const TABLES = [
  'users',
  'posts',
  'answers',
  'comments',
  'scores'
]

export const Database = new Vue({
  data() {
    return {
      docRef: {},
      docUser: null,
      logined: false,
      loginResult: null,
      uid: false,
      user: {
        username: null,
        displayName: null,
        photoURL: null,
        plofile: null
      },
      users: {},
      posts: {},
      answers: {},
      comments: {},
      scores: {}
    }
  },
  methods: {
    initDb() {
      for(let i=0;i<TABLES.length;i++) {
        this.setDb(TABLES[i])
      }
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
    setLoginResult() {
      firebase.auth().getRedirectResult().then((result)=> {
        if(result.user) {
          this.loginResult = result
          EventBus.$emit('setModal', {
            able: true,
            text: ['general', 'login']
          })
        }
        EventBus.$emit('loading', false)
      }).catch(() => false)
    },
    initUser() {
      const init = (data)=> {
        if(!data) return false
        this.uid = '' + data.uid
        this.user.displayName = '' + data.displayName
        this.user.photoURL = '' + data.photoURL.replace('_normal', '')
        this.docUser = this.docRef.users.doc(this.uid)
        this.docUser.get().then((docGet)=> {
          this.setUserName(docGet)
          this.updateUser(docGet)
          this.logined = true
        }).catch((err)=> console.log(err))
      }
      firebase.auth().onAuthStateChanged(init)
    },
    setUserName(docGet) {
      if(this.loginResult) {
        this.user.username = this.loginResult.additionalUserInfo.username
      }else if(docGet.exists) {
        const data = docGet.data()
        this.user.username = data.username
      }
    },
    updateUser(docGet) {
      const _user = {}
      if(docGet.exists) { //DBに既存
        const data = docGet.data()
        _user.username = data.username
        _user.displayName = data.displayName
        _user.photoURL = data.photoURL
        _user.plofile = data.plofile
        //this.writeUser(this.user, _user)
      }else { //DB新規追加
        this.docUser.set(this.user)
      }
    },
    writeUser(bef, aft) {
      console.log(bef, aft)
      const ref = this.docRef.users.doc(this.uid)
      if(bef.username != aft.username) ref.doc('username').set(aft.username)
      if(bef.displayName != aft.displayName) ref.doc('displayName').set(aft.displayName)
      if(bef.photoURL != aft.photoURL) ref.doc('photoURL').set(aft.photoURL)
    },
    resetUser() {
      this.uid = false
      this.user = {
        username: null,
        displayName: null,
        photoURL: null,
        plofile: null
      }
    },
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout() {
      firebase.auth().signOut().then(()=> {
        this.resetUser()
        this.logined = false
        EventBus.$emit('setModal', {
          able: true,
          text: ['general', 'logout']
        })
      })
    }
  }
})