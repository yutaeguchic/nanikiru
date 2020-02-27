<template>
  <div class="result">

    <h3 class="single__postTitle">解答結果</h3>

    <template v-if="uid != post.a">
      <div class="single__date">回答日時： {{time}}</div>
      <div v-if="post.e" class="result__label" v-text="post.n===postAnswers[uid].card?'正解':'不正解'"></div>
      <div class="single__section--flex">
        <div>
          <h3 class="single__title">あなたの解答</h3>
          <div class="single__card"><i :class="postAnswers[uid].card"></i></div>
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

      <template v-if="postAnswers">
        <h4 class="single__subTitle--clip">手牌</h4>
        <div class="m-box__cards"><i v-for="(card, i) of post.f" :key="i" :class="card"></i></div>
        <h4 class="single__subTitle--clip">回答率</h4>
        <div
          v-for="card of uniqueCards"
          :key="card"
        >
          <div class="result__probability__card">
            <i :class="card"></i><span>{{probability[card]}}%</span>
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
import DateLabel from '@/components/libs/DateLabel.js'
export default {
  name: 'Result',
  mixins: [
    DateLabel
  ],
  props: [
    'post',
    'uid',
    'postAnswers'
  ],
  data() {
    return {
      answerCards: [],
      uniqueCards: [],
      probability: {},
    }
  },
  computed: {
    time() {
      return this.getDateLabel(this.postAnswers[this.uid].timestamp)
    },
    total() {
      if(this.postAnswers) this.getAnswerCards()
      return this.answerCards.length
    }
  },
  methods: {
    getAnswerCards() {
      this.answerCards = Object.keys(this.postAnswers).map(id => this.postAnswers[id].card)
      this.getProbability()
    },
    getProbability() {
      let unique = Array.from(new Set(this.answerCards))
      for(let i=0; i < unique.length; i++) {
        let count = this.answerCards.filter(e => e===unique[i]).length
        this.probability[unique[i]] = ((count/this.answerCards.length)*100).toFixed(6)
      }
      this.uniqueCards = unique.sort((a, b)=> {
        if(this.probability[a] > this.probability[b]) return -1
        if(this.probability[a] < this.probability[b]) return 1
        return 0
      })
    }
  }
}
</script>