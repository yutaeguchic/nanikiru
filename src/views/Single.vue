<template>
  <div class="content-single">
    <breadcrumb
      text="NANIKIRU"
    />

    <h2 class="m-ttl--page">NANIKIRU <span v-text="post.e?'問題':'相談'"></span></h2>

    <div class="single__date">{{postDate}}</div>
    <div class="single__writer"><i class="icon-pen"></i>{{writer.displayName}}<br>(<a :href="'https://twitter.com/'+writer.username" target="_blank" title="twitter">@{{writer.username}}</a>)</div>

    <h3 class="single__postTitle" v-text="post.d?post.d:'無題'"></h3>
    <div class="single__section">
      <ul class="single__status">
        <li>{{post.g}}{{post.h}}</li>
        <li>{{post.i}}本場</li>
        <li>{{post.j}}家</li>
        <li>{{post.k}}巡目</li>
      </ul>
      <h4 class="single__subTitle">ドラ表示牌</h4>
      <div class="single__card"><i :class="post.l"></i></div>
      <h4 class="single__subTitle">手牌</h4>
      <div class="m-box__cards"><i v-for="(card, i) of post.f" :key="i" :class="card"></i></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">戦況・出題者コメント</h3>
      <div class="single__condition" v-text="post.m?post.m:'なし'"></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">解答</h3>
      <form class="m-box">
        <div class="m-box__title">解答を選択してください</div>
        <div class="m-box__note">※正解の牌が複数枚含まれている際、すべて正解となります、ただし赤ドラは別種として扱われます<br>(例えば正解を<i class="m-card m5"></i>とした際<i class="m-card m5r"></i>は不正解となります)</div>
        <div class="m-box__cards">
          <i v-for="(card, i) of post.f" :key="i" class="large select" :class="[card, {active: answer.card === card}]" :data-value="card" @click="setAnswer($event)"></i>
        </div>
        <div v-if="post.a === currentUser.uid" class="single__submit">
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
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'Single',
  components: {
    Breadcrumb,
    ReturnHome
  },
  props: ['posts', 'users', 'currentUser', 'modalText'],
  data() {
    return {
      postId: null,
      post: {},
      writer: {},
      answer: {
        postId: null,
        timestamp: null,
        uid: null,
        card: null
      }
    }
  },
  watch: {
    posts() {
      if(this.posts) {
        this.setPost()
        this.setWriter()
      }
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
    if(this.posts) {
      this.setPost()
      this.setWriter()
    }
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
    getDate(seconds) {
      const a = new Date(seconds * 1000)
      const year = a.getFullYear()
      const month = a.getMonth()+1
      const date = a.getDate()
      const hours = a.getHours()
      const minutes = a.getMinutes()
      return this.date = year + '/' + month + '/' + date + ' ' + hours + ':' + minutes
    },
    setWriter() {
      this.writer = this.users[this.post.a]
    },
    setAnswer(event) {
      this.answer.card = event.toElement.attributes['data-value'].value
    },
    confirm() {
      if(this.currentUser.login) {
        const time = firebase.firestore.FieldValue.serverTimestamp()
        const answer = {
          postId: this.postId,
          timestamp: time,
          uid: this.currentUser.uid,
          card: this.answer.card
        }
        this.$parent.currentAnswer = answer
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