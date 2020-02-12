<template>
  <div class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>
    <div v-if="answers[postId] && answers[postId][currentUser.uid]">
      <ul class="answer__tabs">
        <li data-value="1" @click="selectTab()">Answer</li>
        <li data-value="2" @click="selectTab()">NANIKIRU</li>
        <li data-value="3" @click="selectTab()"><i class="icon-bubble"></i></li>
      </ul>
      <div class="answer__tabContent">
        <div>test</div>
      </div>
    </div>

    <div v-else>
      <div class="m-box--center">
        <h3 class="m-box__title">ページが表示できません</h3>
        <p>解答者のみ閲覧できます</p>
      </div>
      <div class="m-tac">
        <router-link tag="button" class="m-btn--able" :to="'/post/'+postId" title="NANIKIRUページへ">NANIKIRUへ</router-link>
      </div>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'answer',
  components: {
    Breadcrumb,
    ReturnHome
  },
  props: ['posts', 'users', 'currentUser', 'answers'],
  data() {
    return {
      post: {},
      postId: null,
      writer: {},
      answer: {
        postId: null,
        timestamp: null,
        uid: null,
        card: null
      },
      tab: 1
    }
  },
  watch: {
    posts() {
      if(Object.keys(this.posts).length) {
        this.setPost()
        this.setWriter()
      }
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
    if(Object.keys(this.posts).length) {
      this.setPost()
      this.setWriter()
    }
  },
  methods: {
    setPost() {
      if(this.posts[this.postId]) {
        this.post = this.posts[this.postId]
      }else {
        this.$router.push('/notfound')
      }
    },
    setWriter() {
      this.writer = this.users[this.post.a]
    },
    selectTab() {
      console.log('select')
    }
  }
}
</script>