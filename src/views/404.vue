<template>
  <div class="content-notfound">
    <breadcrumb
      text="Not Found"
    />

    <div class="m-box--center">
      <h3 class="m-box__title m-box__cards"><i class="m-card m4"></i><i class="m-card p1"></i><i class="m-card m4"></i><br>Not Found</h3>
      <p>このURLに該当するページはありません<br>お探しのページは削除された可能性があります</p>
    </div>

    <div class="content__footer">
      <return-home/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ReturnHome from '@/components/btns/ReturnHome.vue'
export default {
  name: 'Notfound',
  components: {
    Breadcrumb,
    ReturnHome
  },
}
</script>