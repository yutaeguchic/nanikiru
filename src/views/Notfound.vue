<template>
  <div class="content-notfound">
    <breadcrumb
      text="Not Found"
    />

    <div class="m-box--center">
      <h3 class="m-box__title m-box__cards"><i class="m-card m4"></i><i class="m-card p1"></i><i class="m-card m4"></i><br>Not Found</h3>
      <template v-if="url">
        <p>下記URLに該当するページはありません<br>
        お探しのページは削除された可能性があります</p>
        <p class="m-box__strong">『{{hostname + url}}』</p>
      </template>
      <template v-else>
        <p>このURLに該当するページはありません<br>お探しのページは削除された可能性があります</p>
      </template>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>
  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'

export default {
  name: 'Notfound',
  props: ['notfound'],
  components: {
    Breadcrumb,
    ReturnHome
  },
  data() {
    return {
      url: null
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.notfoundInit()
      }
    }
  },
  computed: {
    hostname() {
      return location.hostname
    }
  },
  methods: {
    notfoundInit() {
      this.url = (this.notfound.url) ? this.notfound.url : null
      EventBus.$emit('resetNotfound')
    }
  }
}
</script>