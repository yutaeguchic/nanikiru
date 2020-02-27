<template>
  <div class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>
    <div v-if="(answers[postId] && answers[postId][currentUser.uid]) || currentUser.uid === post.a">

      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

      <div class="m-tabContent">

        <transition name="fadeIn">
          <div v-show="tabMode===1">
            <result
              :post="post"
              :uid="currentUser.uid"
              :postAnswers="answers[postId]"
            />
          </div>
        </transition>

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
              :postScores="postScores"
              :currentUser="currentUser"
              @comment="comment($event)"
            />
            <comments
              :comments="comments"
              :postComments="postComments"
              :users="users"
              :masterUid="post.a"
            />
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
import Result from '@/components/answer/Result.vue'
import Cassette from '@/components/cassette/Single.vue'
import Tabs from '@/components/answer/Tabs.vue'
import CommentForm from '@/components/answer/CommentForm.vue'
import Comments from '@/components/answer/Comments.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'answer',
  components: {
    Breadcrumb,
    Result,
    Cassette,
    Tabs,
    CommentForm,
    Comments,
    ReturnHome
  },
  props: [
    'posts',
    'users',
    'scores',
    'currentUser',
    'answers',
    'comments'
  ],
  data() {
    return {
      post: {},
      postId: null,
      writer: {},
      postScores: null,
      postComments: [],
      tabMode: 1
    }
  },
  watch: {
    posts() {
      if(Object.keys(this.posts).length) {
        this.setPost()
        this.setWriter()
      }
    },
    scores() {
      if(Object.keys(this.scores).length) {
        this.setPostScores()
      }
    },
    comments() {
      if(Object.keys(this.comments).length) {
        this.setPostComments()
      }
    }
  },
  mounted() {
    this.postId = this.$route.params['id']
    if(Object.keys(this.posts).length) {
      this.setPost()
      this.setWriter()
    }
    if(Object.keys(this.scores).length) {
      this.setPostScores()
    }
    if(Object.keys(this.comments).length) {
      this.setPostComments()
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
    setPostScores() {
      this.postScores = this.scores[this.postId]
    },
    setPostComments() {
      this.postComments = Object.keys(this.comments).filter(id=>(this.comments[id].postId===this.postId)).sort((a, b)=> {
        if( this.comments[a].timestamp > this.comments[b].timestamp ) return -1
        if( this.comments[a].timestamp < this.comments[b].timestamp ) return 1
        return 0
      })
    },
    changeTab(event) {
      this.tabMode = event
      this.$SmoothScroll(document.body, 400)
    }
  }
}
</script>