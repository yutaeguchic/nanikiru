<template>
  <div class="query__item">
    <h3 class="m-box__title" v-text="post.d?post.d:'無題'"></h3>
    <header class="query__item__header">
      <div class="qmery__item__header__detial">
        <div class="qmery__item__writer">
          <i class="icon-pen"></i>
          <template>{{users[post.a].displayName}}</template>
          <template> (<a :href="'https://twitter.com/'+users[post.a].username" target="_blank" title="twitter">@{{users[post.a].username}}</a>)</template>
        </div>
        <ul class="m-box__status">
          <li>{{post.g}}{{post.h}}</li>
          <li>{{post.i}}本場</li>
          <li>{{post.j}}家</li>
          <li>{{post.k}}巡目</li>
        </ul>
      </div>
      <div class="query__item__dora">ドラ表示牌 <i class="m-card" :class="post.l"></i></div>
    </header>

    <card
      :className = "'m-box__cards'"
      :items = "post.f"
    />

    <footer class="query__item__footer">
      <div class="query__item__footer__detail">
        <div><i class="icon-price-tag"></i><strong v-text="post.e?'問題':'相談'"></strong></div>
        <div>出題者コメント： <strong v-text="post.m?'あり':'なし'"></strong></div>
      </div>
      <router-link tag="button" type="button" class="query__item__btn" :to="'/post/'+postId" v-text="isAnswer(postId)?'回答済み':'挑戦'"></router-link>
    </footer>
  </div>
</template>

<script>
import Card from '@/components/card/Hand.vue'

export default {
  name: 'Post',
  components: {
    Card
  },
  props: [
    'users',
    'uid',
    'post',
    'postId',
    'answers'
  ],
  methods: {
    isAnswer(id) {
      return this.answers[id] && Object.keys(this.answers[id]).includes(this.uid)
    }
  }
}
</script>