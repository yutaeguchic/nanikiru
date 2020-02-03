<template>
  <footer>
    <div class="footer">
      <div class="footer__menuBtn" :class="{'active': menu}" @click="menu = !menu">
        <i v-show="menu" class="icon-close" title="close"></i>
        <i v-show="!menu" class="icon-menu" title="open menu"></i>
      </div>
    </div>
    <div class="footer__overlay--black" :class="{'active': menu}"></div>
    <div class="footer__overlay--blue" :class="{'active': menu}"></div>

    <transition name="fadeIn">
      <div v-show="menu" class="footer__copy">© 2019 - {{ new Date().getFullYear() }} hatobane</div>
    </transition>

    <transition-group tag="ul" class="footer__menu" :class="{'active': menu}" name="fadeInMenu">
      <li v-show="menu" key="about">NANIKIRUとは</li>
      <li v-show="menu" key="history">更新履歴/予定</li>
      <li v-show="menu" key="terms">利用規約</li>
      <li v-show="menu" key="privacy">プライバシーポリシー</li>
      <li v-show="menu&&currentUser.login" key="logout" @click="logout()">ログアウト</li>
    </transition-group>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: ['currentUser'],
  data: function() {
    return {
      menu: false
    }
  },
  methods: {
    logout() {
      this.menu = false
      this.$emit('logout')
    }
  }
}
</script>