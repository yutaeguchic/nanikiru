<template>
  <div class="newPostBtn" @click="submit()" title="add post"><i class="icon-pen"></i></div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'

export default {
  name: 'GlobalNewPost',
  props: ['logined'],
  methods: {
    submit() {
      if(this.logined) {
        this.$router.push('/post/new').catch(()=> {})
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