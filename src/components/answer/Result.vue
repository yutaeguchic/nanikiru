<template>
  <div class="result">

    <h3 class="single__postTitle">解答結果</h3>

    <template v-if="uid != post.a">
      <div class="single__date">回答日時： {{time}}</div>
      <div v-if="post.e" class="result__label" v-text="post.n===answer.card?'正解':'不正解'"></div>

      <div class="single__section--flex">
        <div>
          <h3 class="single__title">あなたの解答</h3>
          <div class="single__card"><i :class="answer.card"></i></div>
        </div>
        <div v-if="post.e">
          <h3 class="single__title">出題者の正答</h3>
          <div class="single__card"><i :class="post.n"></i></div>
        </div>
      </div>
      <div class="single__section" v-if="post.e">
        <h3 class="single__title">出題者の解説</h3>
        <div class="single__entry" v-text="post.o"></div>
      </div>
    </template>

    <template v-else>
      <div class="single__section">
        <div>あなたはNANIKIRUの出題者です。</div>
      </div>
    </template>

    <div class="result__probability">

      <h3 class="single__title">みなさまの解答</h3>
      <h4 class="single__subTitle--user">総回答数: {{total}}</h4>

      <template v-if="answerCards">
        <h4 class="single__subTitle--clip">手牌</h4>
        <div class="m-box__cards"><i v-for="(card, i) of post.f" :key="i" :class="card"></i></div>
        <h4 class="single__subTitle--clip">回答の割合</h4>
        <div
          v-for="(card, index) of answerCards"
          :key="index"
        >
          <div class="result__probability__card">
            <i :class="card[0]"></i><span>{{card[1]}}%</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div>このNANIKIRUに<br>まだ解答はありません。</div>
      </template>

    </div>

  </div>
</template>

<script>
import DateLabel from '@/components/mixin/DateLabel.js'
export default {
  name: 'Result',
  mixins: [
    DateLabel
  ],
  props: [
    'uid',
    'post',
    'postAnswers',
    'answer'
  ],
  data() {
    return {
      answerCards: [] //[[card, probability], ...]
    }
  },
  watch: {
    'postAnswers': {
      immediate: true,
      handler() {
        if(Object.keys(this.postAnswers).length) this.getAnswerCards()
      }
    }
  },
  computed: {
    time() {
      return (this.postAnswers[this.uid].timestamp.seconds) ? this.$_getDateLabel(this.postAnswers[this.uid].timestamp) : '反映中'
    },
    total() {
      return Object.keys(this.postAnswers).length
    }
  },
  methods: {
    getAnswerCards() {
      const data = []
      const cards = Object.keys(this.postAnswers).map(id => this.postAnswers[id].card)
      const uniqueCards = Array.from(new Set(cards))
      for(let i=0; i < uniqueCards.length; i++) {
        const count = cards.filter(e => e===uniqueCards[i]).length
        const probability = ((count/this.total)*100).toFixed(6)
        data[i] = [uniqueCards[i], probability]
      }
      this.answerCards = data.sort((a, b)=> {
        const _a = a[1]
        const _b = b[1]
        if (_a === _b) return 0
        return (_a > _b) ? -1 : 1
      })
    }
  }
}
</script>