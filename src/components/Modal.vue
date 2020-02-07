<template>
  <div class="m-overlay" @click.self="close()">
    <div class="m-modal">
      <h1 class="m-ttl">{{text.title}}</h1>
      <div class="m-modal__content" v-html="text.content"></div>
      <transition name="fadeInDown">
        <div v-show="text.button" class="m-modal__btn"><button type="button" class="m-btn--able" @click="$emit('submit')">{{text.button}}</button></div>
      </transition>
      <button class="m-modal__close" type="button" @click.stop="close()"><i class="icon-close"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modal'],
  data() {
    return {
      show: false,
      text: {
        title: '',
        content: '',
        button: ''
      },
      subData: '',
      dbText: {
        single: {
          confirm: {
            title: '確認',
            content: '<p>以下の牌で回答してよろしいですか？<strong>※NANIKIRUの解答は１つ１回まで</strong></p><div class="m-modal__card"><i class="'+this.subData+'"></i></div>',
            button: '解答する'
          },
          errorWrite: {
            title: '解答ができません',
            content: '<p>NANIKIRUの出題者のため</p>',
            button: ''
          },
          requireLogin: {
            title: 'ログインして下さい',
            content: '<p>NANIKIRUの解答にはTwitterアカウントによる承認が必要です</p>',
            button: 'ログインする'
          }
        },
        post: {
          errorDora: {
            title: 'ドラ表示牌/手配を変更してください',
            content: '<p>ドラ表示牌を手配で使い切っています</p>',
            button: ''
          },
          errorCountCondition: {
            title: '戦況・コメントの文章を変更してください',
            content: '<p>上限の1000文字を超えています</p>',
            button: ''
          },
          errorCountCommentary: {
            title: '解説の文章を変更してください',
            content: '<p>上限の1000文字を超えています</p>',
            button: ''
          },
          errorPost: {
            title: '投稿エラー',
            content: '<p><strong>NANIKIRU</strong>の投稿に失敗しました</p>',
            button: ''
          },
          submit: {
            title: '投稿完了',
            content: '<p><strong>NANIKIRU</strong>を投稿しました</p>',
            button: ''
          }
        },
        newPost: {
          requireLogin: {
            title: 'ログインして下さい',
            content: '<p>NANIKIRUの投稿にはTwitterアカウントによる承認が必要です</p>',
            button: 'ログインする',
          }
        },
        general: {
          login: {
            title: 'ログイン成功',
            content: '<p>ログインしました</p>',
            button: ''
          },
          logout: {
            title: 'ログアウト成功',
            content: '<p>ログアウトしました</p>',
            button: ''
          }
        }
      }
    }
  },
  watch: {
    modal() {
      if(this.modal.able) this.init()
    }
  },
  mounted() {
    if(this.modal.able) this.init()
  },
  methods: {
    init() {
      if(this.modal.tag.isArray) {
        this.text.data = this.modal.tag[1]
        this.text.data = this.dbText[this.modal.page][this.modal.tag[0]]
      }else {
        this.text = this.dbText[this.modal.page][this.modal.tag]
      }
      this.show = true
    },
    close() {
      this.show = false
      this.$parent.modal = {
        able: false,
        page: '',
        tag: '',
        funcName: false
      }
    }
  }
}
</script>