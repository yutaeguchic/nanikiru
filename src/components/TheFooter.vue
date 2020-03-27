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

    <transition name="fadeInLeft">
      <div v-show="menu" class="footer__copy">© 2019 - {{ new Date().getFullYear() }} NANIKIRU</div>
    </transition>

    <transition name="fadeInLeft">
      <div v-show="menu" class="footer__inquiry"><a href="https://twitter.com/NANIKIRU3" target="_blank"><img src="https://pbs.twimg.com/profile_images/1206809975256801280/QuHde0s0.jpg" alt="問い合わせ先"></a></div>
    </transition>

    <transition name="fadeInLeft">
      <div v-show="menu" class="footer__inquiryMsg">↑不具合・ご要望・お問い合わせはこちら</div>
    </transition>

    <transition-group tag="ul" class="footer__menu" :class="{'active': menu}" name="fadeInMenu">
      <li v-show="menu" key="about">NANIKIRUとは</li>
      <li v-show="menu" key="history">更新履歴/予定</li>
      <li v-show="menu" key="terms">利用規約</li>
      <li v-show="menu" key="privacy">プライバシーポリシー</li>
      <li v-show="menu&&logined" key="logout" @click="logout()">ログアウト</li>
    </transition-group>
  </footer>
</template>

<script>
import {Database} from '@/components/libs/Database.js'

export default {
  name: 'TheFooter',
  data() {
    return {
      menu: false
    }
  },
  computed: {
    logined() {
      return Database.logined
    }
  },
  methods: {
    logout() {
      this.menu = false
      Database.logout()
    }
  }
}
</script>