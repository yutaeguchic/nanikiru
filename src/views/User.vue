<template>
  <div v-if="pageUser" class="content-user">
    <breadcrumb
      :text="myPage?'マイページ':'ユーザーページ'"
    />

    <div class="m-section">
      <h2 class="m-ttl--page">ユーザー情報</h2>
      <plofile
        :user="pageUser"
        :uid="pageId"
      />
    </div>

    <template v-if="myPage">
      <h2 class="m-ttl--page">マイページ</h2>
    </template>
    <template v-else>
      <h2 class="m-ttl--page">{{pageUser.username}}さんのユーザーページ</h2>
    </template>

    <div class="m-section">
      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

      <div class="m-tabContent">

        <transition name="fadeIn">
          <div v-show="tabMode===1">
            <h3 class="single__postTitle">投稿済み（@{{pageUser.displayName}}）</h3>
            <posted
              :users="users"
              :uid="uid"
              :posts="posts"
              :pageId="pageId"
              :answers="answers"
            />
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===2">
            <h3 class="single__postTitle">回答済み（@{{pageUser.displayName}}）</h3>
            <template v-if="myPage">
              <answered
                :users="users"
                :uid="uid"
                :posts="posts"
                :pageId="pageId"
                :answers="answers"
              />
            </template>
            <template v-else>
              <div class="m-section">本人のみ閲覧可です。</div>
            </template>
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===3">
            <h3 class="single__postTitle">お気に入り</h3>
            <div class="m-section">お気に入り機能は実装中です。</div>
          </div>
        </transition>

        <tabs
          :mode="tabMode"
          @change="changeTab($event)"
        />

      </div>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Tabs from '@/components/user/Tabs.vue'
import Posted from '@/components/user/Posted.vue'
import Answered from '@/components/user/Answered.vue'
import Plofile from '@/components/user/Plofile.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'User',
  components: {
    Breadcrumb,
    Tabs,
    Posted,
    Answered,
    Plofile,
    ReturnHome
  },
  props: [
    'users',
    'uid',
    'pageId',
    'posts',
    'answers'
  ],
  data() {
    return {
      tabMode: 1
    }
  },
  computed: {
    pageUser() {
      return this.users[this.pageId]
    },
    myPage() {
      return (this.uid === this.pageId)
    }
  },
  watch: {
    'users': {
      immediate: true,
      handler() {
        if(Object.keys(this.users).length) this.$emit('existId', 'users')
      }
    }
  },
  methods: {
    changeTab(event) {
      this.tabMode = event
      this.$SmoothScroll(document.body, 400)
    }
  }
}
</script>