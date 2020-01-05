<template>
  <footer class="footer" :class="{'active': footerNav}">
    <nav v-if="footerNav">
      <p class="footer__copy">© 2019 - {{ new Date().getFullYear() }} hatobane</p>
      <ul class="footer__nav">
        <li>利用規約</li>
        <li>プライバシーポリシー</li>
      </ul>
      <div class="footer__btn" @click="navClose()" title="close"><i class="icon-close"></i></div>
    </nav>
    <div class="footer__btn" v-else title="open menu"><i class="icon-menu" @click="navShow()"></i></div>
  </footer>
</template>

<script>
export default {
  data: function() {
    return {
      footerNav: false
    }
  },
  methods: {
    navShow: function() {
      return this.footerNav = true
    },
    navClose: function() {
      return this.footerNav = false
    }
  }
}
</script>