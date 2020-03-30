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
              :post.sync="post"
              :postAnswers.sync="postAnswers"
              :answer.sync="answer"
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
              :postId="postId"
              :postScores="postScores"
              @comment="comment($event)"
            />
            <comments
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
        <router-link tag="button" class="m-btn--able" :to="'/post/'+postId" title="NANIKIRUページへ">NANIKIRUへ</router-link>
      </div>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import {Database} from '@/components/libs/Database.js'
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
    uid() {
      return Database.uid
    },
    postId() {
      return this.$route.params['id']
    },
    posts() {
      return Database.posts
    },
    post() {
      return this.posts[this.postId]
    },
    writer() {
      return Database.users[this.post.a]
    },
    postAnswers() {
      return (Database.answers[this.postId]) ? Database.answers[this.postId] : false
    },
    answer() {
      return (this.postAnswers && this.postAnswers[this.uid]) ? this.postAnswers[this.uid] : false
    },
    comments() {
      return Database.comments
    },
    postScores() {
      return Database.scores[this.postId]
    }
  },
  methods: {
    existPost() {
      if(!this.posts[this.postId]) EventBus.$emit('toNotfound', this.$route.fullPath)
    },
    setPostComments() {
      this.postComments = Object.keys(this.comments).filter(id=>(this.comments[id].postId===this.postId)).sort((a, b)=> {
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