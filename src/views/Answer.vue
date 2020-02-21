<template>
  <div class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>
    <div v-if="answers[postId] && answers[postId][currentUser.uid]">

      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

      <div class="answer__tabContent">

        <transition name="fadeIn">
          <div v-show="tabMode===2">
            <cassette
              :post.sync="post"
              :writer.sync="writer"
            />
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===3">
            <CommentForm
              :currentUser="currentUser"
              @comment="comment($event)"
            />
            <comments/>
          </div>
        </transition>


      </div>

      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

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
import Cassette from '@/components/cassette/Single.vue'
import Tabs from '@/components/answer/Tabs.vue'
import CommentForm from '@/components/answer/CommentForm.vue'
import Comments from '@/components/answer/Comments.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'answer',
  components: {
    Breadcrumb,
    Cassette,
    Tabs,
    CommentForm,
    Comments,
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
      tabMode: 1
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
    changeTab(event) {
      this.tabMode = event
      this.$SmoothScroll(document.body, 400)
    },
    comment(event) {
      console.log(event)
    }
  }
}
</script>