<template>
  <form class="commentForm">

    <button type="button" class="commentForm__switch" :class="{active: show}" @click="show=!show"><i class="icon-bubble"></i></button>

    <transition name="fadeInDown">
      <div v-show="show" class="m-box">

        <h3 class="m-box__strong">コメント</h3>
        <div class="m-box__note">※上限200文字 <strong>※必須項目</strong></div>
        <textarea class="commentForm__textarea" :maxlength="maxlength.comment" v-model="comment.text"></textarea>

        <h3 class="m-box__strong">NANIKIRUを評価</h3>
        <div class="m-box__note">※評価を複数回送信した際は最新の１回が反映されます<br>(NANIKIRU１問につき１ユーザー１回分まで)<br>
        (「評価を送信しない」選択時、過去に送信した評価は保持されます)</div>
        <div v-show="!scoreSelect" class="commentForm__score"><button type="button" class="commentForm__button" @click="scoreSelect=!scoreSelect"><i class="icon-star"></i><span v-text="comment.score?comment.score+'点':'評価を送信しない'"></span></button></div>

        <transition name="fadeIn">
          <div v-show="scoreSelect">
            <ul class="commentForm__score__select">
              <li @click="setScore(null)">なし</li>
              <li v-for="i of 10" :key="i" @click="setScore(11-i)">{{numLabel[11-i]}}</li>
            </ul>
          </div>
        </transition>

        <h3 class="m-box__strong">コメントを投稿</h3>
        <div>
          <div class="m-box__note">※ボタンを２秒間長押ししてください</div>
          <button type="button" class="commentForm__button--submit" :disabled="!(comment.text&&comment.text.trim())" v-long-press="1900" @long-press-start="submit()"><i class="icon-pen"></i>投稿</button>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
import LongPress from 'vue-directive-long-press'
export default {
  name: 'AnswerCommentForm',
  directives: {
    'long-press': LongPress
  },
  props: ['currentUser'],
  data() {
    return {
      numLabel: Array.from({length:11}, (_, i) => this.toFullwidth(i + '')),
      show: false,
      comment: {
        text: null,
        score: null
      },
      scoreSelect:false,
      maxlength: {
        comment: 200
      }
    }
  },
  methods: {
    toFullwidth(str) {
      return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248)
      })
    },
    setScore(score) {
      this.comment.score = score
      this.scoreSelect = !this.scoreSelect
    },
    submit() {
      if(this.comment.text&&this.comment.text.trim()) this.$emit('comment', this.comment)
    }
  }
}
</script>