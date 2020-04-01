<template>
  <div>
    <div class="single__date">{{time}}</div>
    <div class="single__writer"><i class="icon-pen"></i>{{writer.displayName}}<br>(<a :href="'https://twitter.com/'+writer.username" target="_blank" title="twitter">@{{writer.username}}</a>)</div>

    <h3 class="single__postTitle" v-text="post.d?post.d:'無題'"></h3>
    <div class="m-section">
      <ul class="single__status">
        <li>{{post.g}}{{post.h}}</li>
        <li>{{post.i}}本場</li>
        <li>{{post.j}}家</li>
        <li>{{post.k}}巡目</li>
      </ul>
      <h4 class="single__subTitle--clip">ドラ表示牌</h4>
      <div class="single__card"><i :class="post.l"></i></div>
      <h4 class="single__subTitle--clip">手牌</h4>
      <div class="m-box__cards"><i v-for="(card, i) of post.f" :key="i" :class="card"></i></div>
    </div>

    <div class="m-section">
      <h3 class="single__title">戦況・出題者コメント</h3>
      <div class="single__entry" v-text="post.m?post.m:'なし'"></div>
    </div>
  </div>
</template>

<script>
import DateLabel from '@/components/mixin/DateLabel.js'
export default {
  name: 'SingleCassette',
  mixins: [DateLabel],
  props: ['post', 'writer'],
  computed: {
    time() {
      const d = (this.post.c) ? this.$_getDateLabel(this.post.c) :false
      return d
    }
  }
}
</script>