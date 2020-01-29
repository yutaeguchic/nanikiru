<template>
  <div class="single">

    <h2 class="m-ttl--page" v-text="post.title?post.title:'無題'"></h2>

    <div class="single__section">
      <div class="single__writer"><i class="icon-pen"></i>{{writer.displayName}}<br>(<a :href="'https://twitter.com/'+writer.twid" target="_blank" title="twitter">@{{writer.twid}}</a>)</div>
      <h3 class="single__title" v-text="post.quiz?'問題':'相談'"></h3>
      <ul class="single__status">
        <li>{{post.a}}{{post.b}}</li>
        <li>{{post.c}}本場</li>
        <li>{{post.d}}家</li>
        <li>{{post.e}}巡目</li>
      </ul>
      <h4 class="single__subTitle">ドラ表示牌</h4>
      <div class="single__card"><i :class="post.f"></i></div>
      <h4 class="single__subTitle">手牌</h4>
      <div class="m-box__cards"><i v-for="(card, i) of post.cards" :key="i" :class="card"></i></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">戦況・出題者コメント</h3>
      <div class="single__condition" v-text="post.condition?condition:'なし'"></div>
    </div>

    <div class="single__section">
      <h3 class="single__title">解答</h3>
      <div class="m-box">
        <div class="m-box__note">※正解の牌が複数枚含まれている際、すべて正解となります、ただし赤ドラは別種として扱われます<br>(例えば正解を<i class="m-card m5"></i>とした際<i class="m-card m5r"></i>は不正解となります)</div>
        <div class="m-box__cards">
          <i v-for="(card, i) of post.cards" :key="i" class="large select" :class="[card, {active: answer === card}]" :data-value="card" @click="setAnswer($event)"></i>
        </div>
      </div>
    </div>

    <div class="single__section">
      <h3 class="single__title">出題者</h3>
      <h4 class="single__subTitle">プロフィール</h4>
      <div class="single__profile">なし</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'single',
  props: ['posts', 'users'],
  data() {
    return {
      post: {},
      postId: false,
      writer: {},
      answer: ''
    }
  },
  watch: {
    posts() {
      if(this.posts) {
        this.post = this.posts[this.postId]
        this.writer = this.users[this.post.uid]
      }
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
    if(this.posts) {
      this.post = this.posts[this.postId]
      this.writer = this.users[this.post.uid]
    }
  },
  methods: {
    setAnswer(event) {
      this.answer = event.toElement.attributes['data-value'].value
    }
  }
}
</script>