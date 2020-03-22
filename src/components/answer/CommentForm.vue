<template>
  <form class="commentForm">

    <button type="button" class="commentForm__switch" :class="{active: show}" @click="show=!show"><i class="icon-bubble"></i></button>

    <transition name="fadeInDown">
      <div v-show="show" class="m-box">

        <h3 class="m-box__strong">コメント</h3>
        <div class="m-box__note">※上限200文字 <strong>※必須項目</strong></div>
        <textarea class="commentForm__textarea" :maxlength="maxlength.text" v-model="text"></textarea>

        <h3 class="m-box__strong">NANIKIRUを評価</h3>
        <div class="m-box__note">※評価を複数回送信した際は最新の１回が反映されます<br>(NANIKIRU１問につき１ユーザー１回分まで)<br>
        (「評価を送信しない」選択時、過去に送信した評価は保持されます)</div>
        <div v-show="!score.able" class="commentForm__score"><button type="button" class="commentForm__button" @click="score.able=!score.able"><i class="icon-star"></i><span v-text="score.val?score.val+'点':'評価を送信しない'"></span></button></div>

        <transition name="fadeIn">
          <div v-show="score.able">
            <ul class="commentForm__score__select">
              <li @click="setScore(null)">なし</li>
              <li v-for="i of 10" :key="i" @click="setScore(11-i)">{{numLabel[11-i]}}</li>
            </ul>
          </div>
        </transition>

        <h3 class="m-box__strong">コメントを投稿</h3>
        <div>
          <div class="m-box__note">※ボタンを２秒間長押ししてください</div>
          <button type="button" class="commentForm__button--submit" :disabled="!(text&&text.trim())" v-long-press="1900" @long-press-start="submit()"><i class="icon-pen"></i>投稿</button>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
import firebase from 'firebase'
import LongPress from 'vue-directive-long-press'
import {EventBus} from '@/components/libs/EventBus.js'
import FullWidthNumbers from '@/assets/data/FullWidthNumbers.json'
export default {
  name: 'AnswerCommentForm',
  directives: {
    'long-press': LongPress
  },
  props: [
    'postScores',
    'currentUser'
  ],
  data() {
    return {
      postId: null,
      uid: this.currentUser.uid,
      numLabel: FullWidthNumbers,
      show: false,
      text: null,
      score: {
        able: false,
        label: null,
        val: null,
        before: null
      },
      maxlength: {
        text: 200
      }
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
  },
  methods: {
    setScore(num) {
      this.score.val = num
      this.score.able = !this.score.able
    },
    submit() {
      if(this.text&&this.text.trim()) {
        this.comment()
      }else {
        this.showModal('noText')
      }
    },
    async comment() {
      await this.getLabel()
      if(this.score.val) await this.PostScore()
      await this.postComment()
      await this.reset()
      await this.showModal('submit')
    },
    getLabel() {
      this.score.before = this.postScores && this.postScores[this.uid] ? this.postScores[this.uid] : null
      if(this.score.before) {
        if(this.score.val) {
          if(this.score.before === this.score.val) {
            this.score.label = this.score.val
          }else {
            this.score.label = this.score.before + 'to' + this.score.val
          }
        }else {
          this.score.label = this.score.before
        }
      }else {
        this.score.label = this.score.val
      }
    },
    PostScore() {
      const data = {}
      data[this.uid] = this.score.val
      firebase.firestore().collection('scores').doc(this.postId).set(data, {merge: true}).then(()=> {
        EventBus.$emit('setDb', 'scores')
      })
    },
    postComment() {
      const time = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        timestamp: time,
        postId: this.postId,
        uid: this.uid,
        text: this.text,
        score: this.score.label
      }
      firebase.firestore().collection('comments').add(data).then(()=> {
        EventBus.$emit('setDb', 'comments')
      })
    },
    reset() {
      this.show = false
      this.text = null
      this.score = {
        able: false,
        label: null,
        val: null,
        before: null
      }
    },
    showModal(label) {
      const data = {
        able: true,
        text: ['commentForm', label],
        funcName: null
      }
      EventBus.$emit('setModal', data)
    }
  }
}
</script>