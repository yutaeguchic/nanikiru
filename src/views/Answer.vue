<template>
  <div v-if="post" class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>
    <div v-if="answer || uid === post.a">

      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

      <div class="m-tabContent">

        <transition name="fadeIn">
          <div v-show="tabMode===1">
            <result
              :uid="uid"
              :post="post"
              :postAnswers="postAnswers"
              :answer="answer"
            />
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===2">
            <cassette
              :post="post"
              :writer="writer"
            />
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===3">
            <CommentForm
              :uid="uid"
              :pageId="pageId"
              :postScores="postScores"
              @comment="comment($event)"
            />
            <comments
              :users="users"
              :comments="comments"
              :postComments="postComments"
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
        <router-link tag="button" class="m-btn--able" :to="'/post/'+pageId" title="NANIKIRUページへ">NANIKIRUへ</router-link>
      </div>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
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
    'users',
    'uid',
    'posts',
    'pageId',
    'answers',
    'comments',
    'scores'
  ],
  data() {
    return {
      postComments: [],
      tabMode: 1
    }
  },
  watch: {
    'posts': {
      immediate: true,
      handler() {
        if(Object.keys(this.posts).length) this.existPost()
      }
    },
    'comments': {
      immediate: true,
      handler() {
        if(Object.keys(this.comments).length) this.setPostComments()
      }
    }
  },
  computed: {
    post() {
      return this.posts[this.pageId]
    },
    writer() {
      return this.users[this.post.a]
    },
    postAnswers() {
      return (this.answers[this.pageId]) ? this.answers[this.pageId] : false
    },
    answer() {
      return (this.postAnswers && this.postAnswers[this.uid]) ? this.postAnswers[this.uid] : false
    },
    postScores() {
      return this.scores[this.pageId]
    }
  },
  methods: {
    existPost() {
      if(!this.posts[this.pageId]) EventBus.$emit('toNotfound', this.$route.fullPath)
    },
    setPostComments() {
      this.postComments = Object.keys(this.comments).filter(id=>(this.comments[id].postId===this.pageId)).sort((a, b)=> {
        const _a = this.comments[a].timestamp
        const _b = this.comments[b].timestamp
        if (_a === _b) return 0
        return (_a > _b) ? -1 : 1
      })
    },
    changeTab(event) {
      this.tabMode = event
      this.$SmoothScroll(document.body, 400)
    }
  }
}
</script>