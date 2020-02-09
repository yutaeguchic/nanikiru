<template>
  <div class="m-overlay" @click.self="close()">
    <div class="m-modal">
      <h1 class="m-ttl">{{modal.text.title}}</h1>
      <div class="m-modal__content" v-html="modal.text.content"></div>
      <transition name="fadeInDown">
        <div v-show="modal.text.button" class="m-modal__btn"><button type="button" class="m-btn--able" @click="$emit('submit')">{{modal.text.button}}</button></div>
      </transition>
      <button class="m-modal__close" type="button" @click.stop="close()"><i class="icon-close"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modal'],
  methods: {
    close() {
      this.$parent.modal.able = false
      this.$parent.modal.funcName = null
    }
  }
}
</script>