<template>
  <div class="content-user">
    <breadcrumb
      :text="myPage?'マイページ':'ユーザーページ'"
    />

    <h2 class="m-ttl--page" v-text="myPage?'マイページ':'ユーザーページ'"></h2>
    <div class="userPage" v-if="pageUser">

      <tabs
        :mode="tabMode"
        @change="changeTab($event)"
      />

      <div class="m-tabContent">

        <transition name="fadeIn">
          <div v-show="tabMode===1">
            <h3 class="single__postTitle">{{pageUser.username}}さんのNANIKIRU</h3>
            <div class="userPage__profile">
              <div class="userPage__profile__icon"><a :href="twUrl" target="_blank" title="twitter"><img :src="pageUser.photoURL" :alt="pageUser.displayName"></a></div>
              <div class="userPage__profile__name">{{pageUser.displayName}}<br>(<a :href="twUrl" target="_blank" title="twitter">@{{pageUser.username}}</a>)</div>
            </div>
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===2">
            <h3 class="single__postTitle">回答済みのNANIKIRU</h3>
          </div>
        </transition>

        <transition name="fadeIn">
          <div v-show="tabMode===3">
            <h3 class="single__postTitle">ユーザー情報</h3>
            <div class="userPage__profile">
              <div class="userPage__profile__icon"><a :href="twUrl" target="_blank" title="twitter"><img :src="pageUser.photoURL" :alt="pageUser.displayName"></a></div>
              <div class="userPage__profile__name">{{pageUser.displayName}}<br>(<a :href="twUrl" target="_blank" title="twitter">@{{pageUser.username}}</a>)</div>
            </div>
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
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'User',
  components: {
    Breadcrumb,
    Tabs,
    ReturnHome
  },
  props: [
    'users',
    'uid',
    'pageId',
    'posts'
  ],
  data() {
    return {
      tabMode: 3
    }
  },
  computed: {
    pageUser() {
      return this.users[this.pageId]
    },
    myPage() {
      return (this.uid === this.pageId)
    },
    twUrl() {
      return 'https://twitter.com/' + this.pageUser.username
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