<template>
  <div class="m-box">
    <h3 class="m-box__title" v-text="post.title?post.title:'無題'"></h3>
    <ul class="postStatus--confirm">
      <li>{{post.a}}{{post.b}}</li>
      <li>{{post.c}}本場</li>
      <li>{{post.d}}家</li>
      <li>{{post.e}}巡目</li>
      <li class="postStatus__card">ドラ表示牌 <i :class="post.f"></i></li>
    </ul>
    <div class="postCards--confirm"><i v-for="i of 14" :key="i" :class="post.cards[i-1]"></i></div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'design']
}
</script>