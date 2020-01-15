<template>
  <div class="post">
    <h2 class="m-ttl">NANIKIRU POST (問題作成)</h2>
    <form>

      <div v-show="state===1">
        <h3>局を選択してください</h3>
        <div class="post__set">
          <div class="post__set__radioWrap">
            <input id="a1" class="m-radio" type="radio" value="東" v-model="post.a"><label for="a1">東</label>
            <input id="a2" class="m-radio" type="radio" value="南" v-model="post.a"><label for="a2">南</label>
          </div>
          <ul class="post__set__radioWrap">
            <li v-for="i of 4" :key="i"><input :id="'b'+i" class="m-radio" type="radio" :value="numLabel[i]+'局'" v-model="post.b"><label :for="'b'+i">{{numLabel[i]}}局</label></li>
          </ul>
        </div>

        <h3>本場数を選択してください</h3>
        <div class="post__set">
          <ul class="post__set__radioWrap">
            <li v-for="i of 9" :key="i"><input :id="'c'+(i-1)" class="m-radio" type="radio" :value="numLabel[i-1]" v-model="post.c"><label :for="'c'+(i-1)">{{numLabel[i-1]}}</label></li>
          </ul>
        </div>

        <h3>自風を選択してください</h3>
        <div class="post__set">
          <ul class="post__set__radioWrap">
            <li v-for="(direction, i) of directions" :key="direction"><input :id="'d'+(i+1)" class="m-radio" type="radio" :value="direction" v-model="post.d"><label :for="'d'+(i+1)">{{direction}}</label></li>
          </ul>
        </div>

        <h3>巡目を入力してください</h3>
        <div class="post__set">
          <div class="post__set__rangeWrap">
            <input id="e" class="m-range" type="range" :min="numTour.min" :max="numTour.max" step="1" value="0" v-model="numTour.val" @change="post.e = toFullwidth($event.target.value)">
            <label>{{post.e}}巡目<i class="icon-up" @click="countUp()"></i><i class="icon-down" @click="countDown()"></i></label>
          </div>
        </div>
      </div><!-- /.state1 -->

      <div v-show="state===2">
        <h3>ドラ表示牌を選択してください</h3>
        <div class="post__set">
          <div>※ドラが<i class="m-card m1"></i>の場合は<i class="m-card m9"></i>を、ドラが<i class="m-card dw"></i>の場合は<i class="m-card dr"></i>を選択</div>
          <div>※手牌と合わせ同種の牌は最大４枚、赤ドラは最大１枚です<br>(ページ遷移時に判定されます)</div>
          <div class="post__set__cardWrap">
            <div class="m-cards">
              <i v-for="i of 37" :key="i" :class="[sortCardItems[i-1], {active: post.f === sortCardItems[i-1]}]" :value="sortCardItems[i-1]" @click="dora($event)"></i>
            </div>
          </div>
        </div>

        <h3>手牌を入力してください</h3>
        <div class="post__set">
          <div>※同種の牌はドラ表示牌を含めて最大４枚、赤ドラは最大１枚です</div>
          <div>※下記の牌クリックで追加、画面下部の手牌クリックで削除</div>
          <div class="m-cards">
            <i v-for="i of 37" :key="i" :class="sortCardItems[i-1]" :value="sortCardItems[i-1]" @click="addCard($event)"></i>
          </div>
        </div>

        <h3>状況を入力してください(空白可)</h3>
        <div class="post__set">
        <textarea class="m-textarea" v-model="post.condition"></textarea>
        </div>
      </div><!-- /.state2 -->

      <div v-show="state===3">
        <h3>タイトルを入力してください</h3>
        <div class="post__set">
          <div>※無記入の場合は『無題』となります</div>
          <div>※最大{{postTitle.max}}文字です</div>
          <input class="m-text" type="text" v-model="post.title">
        </div>
      </div>

      <div>
        <button type="button" :class="isPrev()?'m-btn--able':'m-btn--disabled'" :disabled="!isPrev()" @click="prev()">Prev</button>
        <button type="button" :class="isNext()?'m-btn--able':'m-btn--disabled'" :disabled="!isNext()" @click="next()">Next</button>
      </div>

    </form>
    <div class="post__display">
      <div>
        <ul class="post__display__status">
          <li class="post__display__ttl">プレビュー</li>
          <li v-show="post.a && post.b">{{post.a}}{{post.b}}</li>
          <li v-show="post.c">{{post.c}}本場</li>
          <li v-show="post.d">{{post.d}}家</li>
          <li v-show="post.e">{{post.e}}巡目</li>
          <li class="post__display__status__dora" v-show="post.f">ドラ表示牌 <i class="m-card" :class="post.f"></i></li>
        </ul>
        <div v-show="state===2" class="post__display__cards">
          <i v-for="i of 13" :key="i" v-show="post.cards[i-1]" :class="post.cards[i-1]" :data-index="i-1" @click="removeCard($event)"></i>
        </div>
        <div v-show="state!=2" class="post__display__cards--fix">
          <i v-for="i of 13" :key="i" v-show="post.cards[i-1]" :class="post.cards[i-1]" :data-index="i-1"></i>
        </div>
      </div>
    </div>
    <transition name="fadeDown">
      <modal v-if="modal.show" @close="modal.show = false" v-transition="fadeIn">
        <template v-slot:header>
          <h1 class="m-ttl">{{modal.ttl}}</h1>
        </template>
        <template v-slot:content>
          <div v-html="modal.content"></div>
        </template>
      </modal>
    </transition>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
  name: 'post',
  components: {
    Modal
  },
  data() {
    return {
      state: 2,
      modal: {        show: false,
        ttl: '',
        content: ''
      },
      directions: ['東', '南', '西', '北'],
      numLabel: Array.from({length:31}, (_, i) => this.toFullwidth(String(i))),
      sortCardItems: ['m1', 'm2', 'm3', 'm4', 'm5', 'm5r', 'm6', 'm7', 'm8', 'm9', 'p1', 'p2', 'p3', 'p4', 'p5', 'p5r', 'p6', 'p7', 'p8', 'p9', 's1', 's2', 's3', 's4', 's5', 's5r', 's6', 's7', 's8', 's9', 'we', 'ws', 'ww', 'wn', 'dw', 'db', 'dr', null],
      numTour: { //巡目
        val: 1,
        min: 0,
        max: 21
      },
      postTitle: {
        max: 32
      },
      cardFull: false,
      post: {
        title: '', //タイトル
        cards: new Array(14).fill(null), //手牌
        condition: '', //状況
        a: false, //局風
        b: false, //局数
        c: false, //本場
        d: false, //自風
        e: '１', //巡目
        f: false, //ドラ
      }
    }
  },
  methods: {
    toFullwidth(str) {
      return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248)
      })
    },
    toHalfwidth(str) {
      return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248)
      })
    },
    countUp() {
      if(this.numTour.val === this.numTour.max) return false
      const s = Number(this.toHalfwidth(this.post.e)) + 1
      this.numTour.val = s
      this.post.e = this.toFullwidth(String(s))
    },
    countDown() {
      if(this.numTour.val === this.numTour.min) return false
      const s = Number(this.toHalfwidth(this.post.e)) - 1
      this.numTour.val = s
      this.post.e = this.toFullwidth(String(s))
    },
    dora(event) {
      this.post.f = event.target.classList[0]
    },
    addCard(event) {
      const val = event.target.classList[0]
      if(!this.cardValidate(val) && !this.cardFull) {
        this.$set(this.post.cards, this.post.cards.indexOf(null), val)
        this.cardFull = (!this.post.cards.some(e => e === null))
        this.sortCard()
      }
    },
    removeCard(event) {
      let index = event.toElement.attributes['data-index'].value
      this.post.cards[index] = null
      this.sortCard()
      this.cardFull = false
    },
    sortCard() {
      this.post.cards.sort((x, y) => {
        return this.sortCardItems.indexOf(x) - this.sortCardItems.indexOf(y)
      })
    },
    cardValidate(val) { //trueにて弾く
      return ((val === 'm5r' || val === 'p5r' || val === 's5r') && (this.post.cards.some(e => e === val)) || this.post.cards.filter(function(e){return e === val || e === val.replace('r', '')}).length >= 4) || (this.post.cards.filter(function(e){return e === val || e === val+'r'}).length >= 4)
    },
    isPrev() {
      return (this.state != 1)
    },
    isNext() {
      if(this.state === 1) {
        return this.post.a && this.post.b && this.post.c && this.post.d && this.post.e
      }else if(this.state === 2) {
        return this.post.f && this.cardFull
      }
    },
    prev() {
      this.state -= 1
      this.$SmoothScroll(document.body, 400)
      return false
    },
    next() {
      if((this.state === 2) && this.cardValidate(this.post.f)) {
        const title = 'ドラ表示牌/手配を変更してください'
        const content = '<p>ドラ表示牌を手配で使い切っています</p>'
        this.showModal(title, content)
      }else {
        this.state += 1
        this.$SmoothScroll(document.body, 400)
      }
      return false
    },
    showModal(ttl, content) {
      this.modal.ttl = ttl
      this.modal.content = content
      this.modal.show = true
    }
  }
}
</script>