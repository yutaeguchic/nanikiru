<template>
  <div class="notfound">
    <div class="m-box">
      <h3 class="m-box__title m-box__cards"><i class="m-card m4"></i><i class="m-card p1"></i><i class="m-card m4"></i><br>Not Found</h3>
      <p>このURLに該当するページはありません<br>お探しのページは削除された可能性があります</p>
      <button type="button" class="m-btn--able" @click="$router.push('/')">Homeに戻る</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notfound'
}
</script>