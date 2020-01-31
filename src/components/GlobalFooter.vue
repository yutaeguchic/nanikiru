<template>
  <footer>
    <div class="footer" :class="{'active': footerNav}">
      <div class="footer__btn">
        <i v-show="footerNav" class="icon-close" @click="navClose()" title="close"></i>
        <i v-show="!footerNav" class="icon-menu" @click="navShow()" title="open menu"></i>
      </div>
    </div>
    <div class="footer__overlay"></div>

    <transition name="fadeIn">
      <div v-show="footerNav" class="footer__copy">© 2019 - {{ new Date().getFullYear() }} hatobane</div>
    </transition>
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