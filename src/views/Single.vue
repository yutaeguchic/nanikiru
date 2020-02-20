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
          <i v-for="(card, i) of post.f" :key="i" class="large" :class="[card, {active: answer.card === card}]"></i>
        </div>
        <div v-else class="m-box__cards">
          <i v-for="(card, i) of post.f" :key="i" class="large select" :class="[card, {active: answer.card === card}]" :data-value="card" @click="selectAnswer($event)"></i>
        </div>
        <div v-if="answered" class="single__submit">
          <router-link tag="button" class="m-btn--able" :to="'/answer/'+postId" title="解答ページへ">解答を見る</router-link>
          <div class="single__submit__note">※回答済みです</div>
        </div>
        <div v-else-if="post.a === currentUser.uid" class="single__submit">
          <button type="button" class="m-btn--disabled">解答する</button>
          <div class="single__submit__note">※出題者のため、解答はできません</div>
        </div>
        <div v-else class="single__submit"><button type="button" :class="answer.card?'m-btn--able':'m-btn--disabled'" :disabled="!answer.card" @click="confirm()">解答する</button></div>
      </form>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
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
  props: ['posts', 'users', 'currentUser', 'answers', 'modalText'],
  data() {
    return {
      post: {},
      postId: null,
      writer: {},
      answer: {
        postId: null,
        timestamp: null,
        uid: null,
        card: null
      },
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
    this.postId = this.$route.params['id']
    if(Object.keys(this.posts).length) {
      this.setPost()
      this.setWriter()
    }
    Object.keys(this.answers).length && this.isAnswered()
  },
  computed: {
    postDate: function() {
      const d = (this.post.c)? this.getDate(this.post.c.seconds):false
      return d
    }
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
      if(this.answers[this.postId] && this.answers[this.postId][this.currentUser.uid]) {
        this.answer.card = this.answers[this.postId][this.currentUser.uid].card
        this.answered = true
      }
    },
    selectAnswer(event) {
      this.answer.card = event.target.attributes['data-value'].value
    },
    confirm() {
      if(this.currentUser.login) {
        const time = firebase.firestore.FieldValue.serverTimestamp()
        let data = {
          postId: this.postId,
          uid: this.currentUser.uid,
          timestamp: time,
          card: this.answer.card
        }
        this.$parent.currentAnswer = data
        this.$parent.modal = {
          able: true,
          text: {
            title: this.modalText.single.confirm.title,
            content: this.modalText.single.confirm.content.replace(/\{\{card\}\}/, this.answer.card),
            button: this.modalText.single.confirm.button
          },
          funcName: 'postAnswer'
        }
      }else if(this.post.a === this.currentUser.uid) {
        this.$parent.modal = {
          able: true,
          text: this.modalText.single.errorWrite,
          funcName: null
        }
      }else if(!this.currentUser.login){
        this.$parent.modal = {
          able: true,
          text: this.modalText.single.requireLogin,
          funcName: 'login'
        }
      }
    }
  }
}
</script>