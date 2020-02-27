<template>
  <div>
    <h3 class="single__postTitle">コメント一覧</h3>
    <template v-if="postComments.length">
      <ul class="comments">
        <Comment
          v-for="(c, i) of postComments"
          :key="i"
          :number="postComments.length-i"
          :comment="comments[c]"
          :masterUid="masterUid"
          :commentUser="users[comments[c].uid]"
        />
      </ul>
    </template>
    <template v-else>
      <ul class="comments">
        <li class="comment">
          <div class="comment__count">0</div>
          <div class="comment__status">
            <h4>NANIKIRU<span>(管理者)</span><br>(<a href="https://twitter.com/NANIKIRU3" target="_blank" title="twitter">@NANIKIRU3</a>)</h4>
            <div class="comment__icon"><a href="https://twitter.com/NANIKIRU3" target="_blank" title="twitter"><img src="https://pbs.twimg.com/profile_images/1206809975256801280/QuHde0s0.jpg" alt="NANIKIRU"></a></div>
          </div>
          <div class="comment__text">このNANIKIRUにコメントはありません。<br>お気軽にコメントくださいませ。<br>※上部の「吹き出しアイコン」を押すとコメントフォームが表示されます。</div>
          <footer>
            <div class="comment__star"><i class="icon-star"></i>---</div>
            <div class="comment__time">0000/00/00 00:00</div>
          </footer>
        </li>
      </ul>
    </template>

  </div>
</template>

<script>
import Comment from '@/components/answer/Comment.vue'
export default {
  name:'Comments',
  components: {
    Comment
  },
  props: [
    'comments',
    'postComments',
    'users',
    'masterUid'
  ],
  computed: {
    time(timestamp) {
      const d = (this.post.c) ? this.getDateLabel(timestamp) :false
      return d
    }
  },
  data() {
    return {
    }
  }
}
</script>