<template>
  <div class="content-single">
    <breadcrumb
      text="NANIKIRU"
    />

    <h2 class="m-ttl--page">NANIKIRU <span v-text="post.quiz?'問題':'相談'"></span></h2>

    <div class="single__date">{{postDate}}</div>
    <div class="single__writer"><i class="icon-pen"></i>{{writer.displayName}}<br>(<a :href="'https://twitter.com/'+writer.username" target="_blank" title="twitter">@{{writer.username}}</a>)</div>

    <h3 class="single__postTitle" v-text="post.title?post.title:'無題'"></h3>
    <div class="single__section">
      <ul class="single__status">
        <li>{{post.a}}{{post.b}}</li>
        <li>{{post.c}}本場</li>
        <li>{{post.d}}家</li>
        <li>{{post.e}}巡目</li>
      </ul>
      <h4 class="single__subTitle">ドラ表示牌</h4>
      <div class="single__card"><i :class="post.f"></i></div>
      <h4 class="single__subTitle">手牌</h4>
      <div class="m-box__cards"><i v-for="(card, i) of post.cards" :key="i" :class="card"></i></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">戦況・出題者コメント</h3>
      <div class="single__condition" v-text="post.condition?post.condition:'なし'"></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">解答</h3>
      <form class="m-box">
        <div class="m-box__title">解答を選択してください</div>
        <div class="m-box__note">※正解の牌が複数枚含まれている際、すべて正解となります、ただし赤ドラは別種として扱われます<br>(例えば正解を<i class="m-card m5"></i>とした際<i class="m-card m5r"></i>は不正解となります)</div>
        <div class="m-box__cards">
          <i v-for="(card, i) of post.cards" :key="i" class="large select" :class="[card, {active: answer.card === card}]" :data-value="card" @click="setAnswer($event)"></i>
        </div>
        <div v-if="post.uid === currentUser.uid" class="single__submit">
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
  props: ['posts', 'users', 'currentUser'],
  data() {
    return {
      post: {},
      postId: false,
      writer: {},
      answer: {
        postId: '',
        timestamp: false,
        uid: '',
        card: false
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
      const d = (this.post.timestamp)? this.getDate(this.post.timestamp.seconds):false
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
      this.writer = this.users[this.post.uid]
    },
    setAnswer(event) {
      this.answer.card = event.toElement.attributes['data-value'].value
    },
    confirm() {
      if(this.currentUser.login) {
        const time = firebase.firestore.FieldValue.serverTimestamp()
        const data = {
          title: '確認',
          content: '<p>以下の牌で回答してよろしいですか？<strong>※NANIKIRUの解答は１つ１回まで</strong></p><div class="m-modal__card"><i class="'+this.answer.card+'"></i></div>',
          submit: true,
          button: '解答する',
          funcName: 'postAnswer',
          answer: {
            postId: this.postId,
            timestamp: time,
            uid: this.currentUser.uid,
            card: this.answer.card
          },
          show: true
        }
        this.$emit('modal', data)
      }else if(this.post.uid === this.currentUser.uid) {
        const data = {
          title: '解答ができません',
          content: '<p>NANIKIRUの出題者のため</p>',
          show: true
        }
        this.$emit('modal', data)
      }else {
        const data = {
          title: 'ログインして下さい',
          content: '<p>NANIKIRUの解答にはTwitterアカウントによる承認が必要です</p>',
          submit: true,
          button: 'ログインする',
          funcName: 'login',
          show: true
        }
        this.$emit('modal', data)
      }
    }
  }
}
</script>