<template>
  <li class="comment">
    <div class="comment__count">{{number}}</div>
    <div class="comment__status">
      <h4>{{commentUser.displayName}}<span v-if="masterUid===comment.uid">(出題者)</span><br>(<a :href="'https://twitter.com/'+commentUser.username" target="_blank" title="twitter">@{{commentUser.username}}</a>)</h4>
      <div class="comment__icon"><router-link tag="a" :to="'/user/'+commentUid" title="user page"><img :src="commentUser.photoURL" :alt="commentUser.displayName"></router-link></div>
    </div>
    <div class="comment__text">{{comment.text}}</div>
    <footer>
      <div class="comment__star"><i class="icon-star"></i>{{score}}</div>
      <div class="comment__time">{{time}}</div>
    </footer>
  </li>
</template>

<script>
import DateLabel from '@/components/mixin/DateLabel.js'
import FullWidthNumbers from '@/assets/data/FullWidthNumbers.json'
export default {
  name: "Comment",
  mixins: [DateLabel],
  props: [
    'comment',
    'masterUid',
    'number',
    'commentUser',
    'commentUid'
  ],
  data(){
    return {
      numLabel: FullWidthNumbers
    }
  },
  computed: {
    time() {
      return this.$_getDateLabel(this.comment.timestamp)
    },
    score() {
      if(this.comment.score) {
        if(/to/.test(this.comment.score)) {
          const a = this.comment.score.split('to')
          return this.numLabel[a[0]] + '→ ' + this.numLabel[a[1]]
        }else {
          return this.numLabel[this.comment.score]
        }
      }else {
        return '---'
      }
    }
  }
}
</script>