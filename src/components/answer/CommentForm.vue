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
export default {
  name: 'AnswerCommentForm',
  directives: {
    'long-press': LongPress
  },
  props: ['users', 'currentUser'],
  data() {
    return {
      postId: null,
      numLabel: Array.from({length:11}, (_, i) => this.toFullwidth(i + '')),
      show: false,
      text: null,
      score: {
        able: false,
        val: null,
        before: null,
        label: null
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
    toFullwidth(str) {
      return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248)
      })
    },
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
      const timestamp = await firebase.firestore.FieldValue.serverTimestamp()
      console.log(timestamp)
      if(this.score) {
        await this.setPostScore(this.score)
        this.score.before = this.currentUser.db.score[this.postId]
          ? this.currentUser.db.score[this.postId]
          : null
        this.score.label = (this.score.before && this.score.before != this.score.val)
          ? this.score.before + 'to' + this.score.val
          : this.score.val
      }
      await this.addComment()
      await this.showModal('submit')
    },
    setPostScore() {
      console.log('setPostScore')
    },
    addComment() {
      console.log('addComment')
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