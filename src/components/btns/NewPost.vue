<template>
  <div class="newPostBtn" @click="jump()" title="add post"><i class="icon-pen"></i></div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
export default {
  name: 'GlobalNewPost',
  props: ['isLogin'],
  methods: {
    jump() {
      if(this.isLogin) {
        const target = '/post/new'
        if(target != this.$route.path) this.$router.push('/post/new')
      }else {
        const data = {
          able: true,
          text: ['newPost', 'requireLogin'],
          funcName: 'login'
        }
        EventBus.$emit('setModal', data)
      }
    }
  }
}
</script>