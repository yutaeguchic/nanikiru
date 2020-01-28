<template>
  <div class="query__item">
    <h3 class="m-box__title" v-text="post.title?post.title:'無題'"></h3>
    <header class="query__item__header">
      <div class="qmery__item__header__detial">
        <div class="qmery__item__writer"><i class="icon-pen"></i><span v-text="getWriter(post.uid)"></span></div>
        <ul class="m-box__status">
          <li>{{post.a}}{{post.b}}</li>
          <li>{{post.c}}本場</li>
          <li>{{post.d}}家</li>
          <li>{{post.e}}巡目</li>
        </ul>
      </div>
      <div class="query__item__dora">ドラ表示牌 <i class="m-card" :class="post.f"></i></div>
    </header>
    <div class="m-box__cards"><i v-for="i of 14" :key="i" :class="post.cards[i-1]"></i></div>
    <footer class="query__item__footer">
      <div class="query__item__footer__detail">
        <div><i class="icon-price-tag"></i><strong v-text="post.quiz?'問題':'相談'"></strong></div>
        <div>戦況・作者コメント： <strong v-text="post.condition?'あり':'なし'"></strong></div>
      </div>
      <router-link tag="button" type="button" class="query__item__btn" :to="'/post/'+postId">挑戦（詳細）</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'postId', 'users'],
  methods: {
    getWriter(uid) {
      if(this.users[uid]) {
        return this.users[uid].displayName + ' （@' + this.users[uid].twid + '）'
      }
    }
  }
}
</script>