<template>
  <div class="content-user">
    <breadcrumb
      :text="isMypage?'マイページ':'ユーザーページ'"
    />

    <h2 class="m-ttl--page" v-text="isMypage?'マイページ':'ユーザーページ'"></h2>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'User',
  components: {
    Breadcrumb
  },
  props: ['currentUser', 'posts', 'users'],
  data() {
    return {
      pageId: '',
      isMypage: false
    }
  },
  watch: {
    users() {
      if(this.currentUser.login&&this.users) this.judgeMypage()
    }
  },
  mounted() {
    this.pageId = this.$route.params['uid']
    if(this.currentUser.login&&this.users) this.judgeMypage()
  },
  methods: {
    judgeMypage() {
      this.isMypage = (this.currentUser.uid === this.pageId)
    }
  }
}
</script>