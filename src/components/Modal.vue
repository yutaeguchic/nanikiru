<template>
  <transition name="fadeInDown">
    <div v-show="able" class="m-overlay" @click.self="close()">
      <div class="m-modal">
        <h1 class="m-ttl">{{text.title}}</h1>
        <div class="m-modal__content" v-html="text.content"></div>
        <transition name="fadeInDown">
          <div v-show="text.button" class="m-modal__btn"><button type="button" class="m-btn--able" @click="submit(funcName)">{{text.button}}</button></div>
        </transition>
        <button class="m-modal__close" type="button" @click.stop="close()"><i class="icon-close"></i></button>
      </div>
    </div>
  </transition>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import modalText from '@/assets/data/modalText.json'
export default {
  name: 'Modal',
  data() {
    return {
      modalText: modalText,
      able: false,
      text: {
        title: null,
        content: null,
        button: null
      },
      funcName: null
    }
  },
  mounted() {
    EventBus.$on('setModal', (data)=> this.setModal(data))
    EventBus.$on('rawSetModal', (data)=> this.rawSetModal(data))
    EventBus.$on('showModal', ()=> this.show())
    EventBus.$on('closeModal', ()=> this.close())
  },
  methods: {
    rawSetModal(data) {
      this.able = data.able
      this.text = data.text
      if(data.funcName) {
        this.funcName = data.funcName
      }
    },
    setModal(data) {
      this.able = data.able
      this.text = this.modalText[data.text[0]][data.text[1]]
      this.funcName = data.funcName
    },
    show() {
      this.able = true
    },
    close() {
      this.able = false
      this.funcName = null
    },
    submit(funcName) {
      EventBus.$emit(funcName)
    }
  }
}
</script>