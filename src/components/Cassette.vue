<template>
  <div class="query__item" title="answer">
    <h3 class="m-box__title" v-text="post.title?post.title:'無題'"></h3>
    <ul class="m-box__status">
      <li>{{post.a}}{{post.b}}</li>
      <li>{{post.c}}本場</li>
      <li>{{post.d}}家</li>
      <li>{{post.e}}巡目</li>
      <li class="m-box__card">ドラ表示牌 <i :class="post.f"></i></li>
    </ul>
    <div class="m-box__cards"><i v-for="i of 14" :key="i" :class="post.cards[i-1]"></i></div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'design']
}
</script>