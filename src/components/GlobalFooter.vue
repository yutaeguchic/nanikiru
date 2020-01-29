<template>
  <footer>
    <div class="footer" :class="{'active': footerNav}">
      <nav v-if="footerNav">
        <p class="footer__copy">© 2019 - {{ new Date().getFullYear() }} hatobane</p>
        <ul class="footer__nav">
          <li>利用規約</li>
          <li>プライバシーポリシー</li>
        </ul>
        <div class="footer__btn" @click="navClose()" title="close"><i class="icon-close"></i></div>
      </nav>
      <div class="footer__btn" v-else @click="navShow()" title="open menu"><i class="icon-menu"></i></div>
    </div>
    <div class="footer__overlay"></div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
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