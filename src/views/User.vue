<template>
  <div class="content-user">
    <breadcrumb
      :text="myPage?'マイページ':'ユーザーページ'"
    />

    <h2 class="m-ttl--page" v-text="myPage?'マイページ':'ユーザーページ'"></h2>

    <transition name="fadeIn">
      <div class="userPage" v-if="pageUser">

        <tabs
          :mode="tabMode"
          @change="changeTab($event)"
        />

        <transition name="fadeIn">
          <div v-show="tabMode===1"></div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===2"></div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===3">
            <h3 class="single__postTitle">ユーザー情報</h3>
            <div class="userPage__profile">
              <div class="userPage__profile__icon"><a :href="twitterUrl" target="_blank" title="twitter"><img :src="pageUser.photoURL" :alt="pageUser.displayName"></a></div>
              <div class="userPage__profile__name">{{pageUser.displayName}}<br>(<a :href="twitterUrl" target="_blank" title="twitter">@{{pageUser.username}}</a>)</div>
            </div>
          </div>
        </transition>

        <tabs
          :mode="tabMode"
          @change="changeTab($event)"
        />

      </div>
    </transition>

    <div class="content__footer">
      <return-home/>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Tabs from '@/components/user/Tabs.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'User',
  components: {
    Breadcrumb,
    Tabs,
    ReturnHome
  },
  props: [
    'posts',
    'users',
    'currentUser',
    'answers',
    'comments'
  ],
  data() {
    return {
      pageId: '',
      myPage: false,
      tabMode: 3,
      pageUser: false
    }
  },
  computed: {
    twitterUrl() {
      return 'https://twitter.com/' + this.pageUser.username
    }
  },
  watch: {
    'currentUser.login'() {
      if(this.currentUser.login && this.users) this.isMyPage()
    },
    users() {
      console.log('users')
      if(this.users) this.setPageUser()
    }
  },
  mounted() {
    this.pageId = this.$route.params['uid']
    if(this.currentUser.login && this.users) this.isMyPage()
    if(this.users) this.setPageUser()
  },
  methods: {
    isMyPage() {
      this.myPage = (this.currentUser.uid === this.pageId)
    },
    setPageUser() {
      this.pageUser = this.users[this.pageId]
    },
    changeTab(event) {
      this.tabMode = event
      this.$SmoothScroll(document.body, 400)
    }
  }
}
</script>