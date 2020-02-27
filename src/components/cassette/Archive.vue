<template>
  <div class="query__item">
    <h3 class="m-box__title" v-text="post.d?post.d:'無題'"></h3>
    <header class="query__item__header">
      <div class="qmery__item__header__detial">
        <div class="qmery__item__writer"><i class="icon-pen"></i>{{writer}}</div>
        <ul class="m-box__status">
          <li>{{post.g}}{{post.h}}</li>
          <li>{{post.i}}本場</li>
          <li>{{post.j}}家</li>
          <li>{{post.k}}巡目</li>
        </ul>
      </div>
      <div class="query__item__dora">ドラ表示牌 <i class="m-card" :class="post.l"></i></div>
    </header>
    <div class="m-box__cards"><i v-for="i of 14" :key="i" :class="post.f[i-1]"></i></div>
    <footer class="query__item__footer">
      <div class="query__item__footer__detail">
        <div><i class="icon-price-tag"></i><strong v-text="post.e?'問題':'相談'"></strong></div>
        <div>出題者コメント： <strong v-text="post.m?'あり':'なし'"></strong></div>
      </div>
      <router-link tag="button" type="button" class="query__item__btn" :to="'/post/'+postId" v-text="isAnswer?'回答済み':'挑戦'"></router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'postId', 'users', 'isAnswer'],
  computed: {
    writer() {
      const uid = this.post.a
      return this.users[uid].displayName + ' （@' + this.users[uid].username + '）'
    }
  }
}
</script>