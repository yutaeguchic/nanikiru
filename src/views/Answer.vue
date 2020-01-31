<template>
  <div class="content-answer">
    <breadcrumb
      text="NANIKIRU 解答"
    />

    <h2 class="m-ttl--page">NANIKIRU 解答</h2>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'answer',
  components: {
    Breadcrumb
  },
  props: ['posts', 'users'],
  data() {
  },
}
</script>