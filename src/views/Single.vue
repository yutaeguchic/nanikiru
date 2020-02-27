<template>
  <div class="content-single">
    <breadcrumb
      text="NANIKIRU"
    />

    <h2 class="m-ttl--page">NANIKIRU <span v-text="post.e?'問題':'相談'"></span></h2>

    <cassette
      :post.sync="post"
      :writer.sync="writer"
    />

    <div class="single__section">
      <h3 class="single__title">解答</h3>
      <form class="m-box">
        <div class="m-box__title">解答を選択してください</div>
        <div class="m-box__note">※正解の牌が複数枚含まれている際、すべて正解となります、ただし赤ドラは別種として扱われます<br>(例えば正解を<i class="m-card m5"></i>とした際<i class="m-card m5r"></i>は不正解となります)</div>
        <div v-if="answered" class="m-box__cards">
          <i v-for="(card, i) of post.f" :key="i" class="large" :class="[card, {active: answerCard === card}]"></i>
        </div>
        <div v-else class="m-box__cards">
          <i v-for="(card, i) of post.f" :key="i" class="large select" :class="[card, {active: answerCard === card}]" :data-val="card" @click="selectAnswer($event)"></i>
        </div>
        <div v-if="answered" class="single__submit">
          <router-link tag="button" class="m-btn--able" :to="'/answer/'+postId" title="解答ページへ">解答を見る</router-link>
          <div class="single__submit__note">※回答済みです</div>
        </div>
        <div v-else-if="post.a === this.uid" class="single__submit">
          <router-link tag="button" class="m-btn--able" :to="'/answer/'+postId" title="解答ページへ">解答ページへ</router-link>
          <div class="single__submit__note">※出題者のため、解答はできません</div>
        </div>
        <div v-else class="single__submit"><button type="button" :class="answerCard?'m-btn--able':'m-btn--disabled'" :disabled="!answerCard" @click="confirm()">解答する</button></div>
      </form>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import {EventBus} from '@/components/libs/EventBus.js'
import modalText from '@/assets/data/modalText.json'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Cassette from '@/components/cassette/Single.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'Single',
  components: {
    Breadcrumb,
    Cassette,
    ReturnHome
  },
  props: ['posts', 'users', 'currentUser', 'answers', 'comments'],
  data() {
    return {
      post: {},
      postId: null,
      uid: this.currentUser.uid,
      writer: {},
      modalText: modalText,
      answerCard: null,
      answered: false
    }
  },
  watch: {
    posts() {
      if(Object.keys(this.posts).length) {
        this.setPost()
        this.setWriter()
      }
    },
    answers() {
      Object.keys(this.answers).length && this.isAnswered()
    }
  },
  mounted() {
    EventBus.$on('postAnswer', ()=> {
      this.postAnswer()
    })
    this.postId = this.$route.params['id']
    if(Object.keys(this.posts).length) {
      this.setPost()
      this.setWriter()
    }
    Object.keys(this.answers).length && this.isAnswered()
  },
  methods: {
    setPost() {
      if(this.posts[this.postId]) {
        this.post = this.posts[this.postId]
      }else {
        this.$router.push('/notfound')
      }
    },
    setWriter() {
      this.writer = this.users[this.post.a]
    },
    isAnswered() {
      if(this.answers[this.postId] && this.answers[this.postId][this.uid]) {
        this.answerCard = this.answers[this.postId][this.uid].card
        this.answered = true
      }
    },
    selectAnswer(event) {
      this.answerCard = event.target.dataset.val
    },
    confirm() {
      if(this.currentUser.login) {
        const modalData = {
          able: true,
          text: {
            title: this.modalText.single.confirm.title,
            content: this.modalText.single.confirm.content.replace(/\{\{card\}\}/, this.answerCard),
            button: this.modalText.single.confirm.button
          },
          funcName: 'postAnswer'
        }
        EventBus.$emit('rawSetModal', modalData)
      }else if(this.post.a === this.uid) {
        const modalData = {
          able: true,
          text: ['single', 'errorWrite'],
          funcName: null
        }
        EventBus.$emit('setModal', modalData)
      }else if(!this.currentUser.login) {
        const modalData = {
          able: true,
          text: ['single', 'requireLogin'],
          funcName: 'login'
        }
        EventBus.$emit('setModal', modalData)
      }
    },
    postAnswer() {
      const time = firebase.firestore.FieldValue.serverTimestamp()
      const data = {}
      data[this.uid] = {
        timestamp: time,
        card: this.answerCard
      }
      firebase.firestore().collection('answers').doc(this.postId).set(data, {merge: true}).then(()=> {
        this.$router.push('/answer/' + this.postId)
      })
      this.$emit('setDb', 'answers')
      EventBus.$emit('closeModal')
    }
  }
}
</script>