<template>
  <div class="post">
    <h2 class="m-ttl">NANIKIRU POST (問題作成)</h2>
    <form>
      <div v-show="state===1">
        <h3>局を選択してください</h3>
        <div class="post__set">
          <div class="post__set__radioWrap">
            <input id="a1" class="m-radio" type="radio" name="a" value="東" v-model="post.a"><label for="a1">東</label>
            <input id="a2" class="m-radio" type="radio" name="a" value="南" v-model="post.a"><label for="a2">南</label>
          </div>
          <div class="post__set__radioWrap">
            <input id="b1" class="m-radio" type="radio" name="b" value="１局" v-model="post.b"><label for="b1">１局</label>
            <input id="b2" class="m-radio" type="radio" name="b" value="２局" v-model="post.b"><label for="b2">２局</label>
            <input id="b3" class="m-radio" type="radio" name="b" value="３局" v-model="post.b"><label for="b3">３局</label>
            <input id="b4" class="m-radio" type="radio" name="b" value="４局" v-model="post.b"><label for="b4">４局</label>
          </div>
        </div>
        <h3>本場数を選択してください</h3>
        <div class="post__set">
          <div class="post__set__radioWrap">
            <input id="c0" class="m-radio" type="radio" name="c" value="0" v-model="post.c" selected><label for="c0">0</label>
            <input id="c1" class="m-radio" type="radio" name="c" value="１" v-model="post.c" selected><label for="c1">１</label>
            <input id="c2" class="m-radio" type="radio" name="c" value="２" v-model="post.c" selected><label for="c2">２</label>
            <input id="c3" class="m-radio" type="radio" name="c" value="３" v-model="post.c" selected><label for="c3">３</label>
            <input id="c4" class="m-radio" type="radio" name="c" value="４" v-model="post.c" selected><label for="c4">４</label>
            <input id="c5" class="m-radio" type="radio" name="c" value="５" v-model="post.c" selected><label for="c5">５</label>
            <input id="c6" class="m-radio" type="radio" name="c" value="６" v-model="post.c" selected><label for="c6">６</label>
            <input id="c7" class="m-radio" type="radio" name="c" value="７" v-model="post.c" selected><label for="c7">７</label>
            <input id="c8" class="m-radio" type="radio" name="c" value="８" v-model="post.c" selected><label for="c8">８</label>
          </div>
        </div>
        <h3>自風を選択してください</h3>
        <div class="post__set">
          <div class="post__set__radioWrap">
            <input id="d1" class="m-radio" type="radio" name="d" value="東" v-model="post.d" selected><label for="d1">東</label>
            <input id="d2" class="m-radio" type="radio" name="d" value="南" v-model="post.d" selected><label for="d2">南</label>
            <input id="d3" class="m-radio" type="radio" name="d" value="西" v-model="post.d" selected><label for="d3">西</label>
            <input id="d4" class="m-radio" type="radio" name="d" value="北" v-model="post.d" selected><label for="d4">北</label>
          </div>
        </div>
        <h3>巡目を入力してください</h3>
        <div class="post__set">
          <div class="post__set__rangeWrap">
            <input id="e" class="m-range" type="range" min="1" max="21" step="1" value="4" @change="post.e = toFullwidth($event.target.value)">
            <label>{{post.e}}巡目<i class="icon-up" @click="countUp()"></i><i class="icon-down" @click="countDown()"></i></label>
          </div>
        </div>
      </div>
      <div v-show="state===2">
        <h3>ドラ表示牌を選択してください</h3>
        <div class="post__set">
          <div>※ドラが<i class="m-card m1"></i>の場合は<i class="m-card m9"></i>を、ドラが<i class="m-card dw"></i>の場合は<i class="m-card dr"></i>を選択</div>
          <div>※手牌と合わせ同種の牌は最大４枚、赤ドラは最大１枚です<br>(ページ遷移時に判定されます)</div>
          <div class="post__set__cardWrap">
            <div class="m-cards">
              <i class="m1" :class="{active: post.f === 'm1'}" value="m1" @click="dora($event)"></i>
              <i class="m2" :class="{active: post.f === 'm2'}" value="m2" @click="dora($event)"></i>
              <i class="m3" :class="{active: post.f === 'm3'}" value="m3" @click="dora($event)"></i>
              <i class="m4" :class="{active: post.f === 'm4'}" value="m4" @click="dora($event)"></i>
              <i class="m5" :class="{active: post.f === 'm5'}" value="m5" @click="dora($event)"></i>
              <i class="m6" :class="{active: post.f === 'm6'}" value="m6" @click="dora($event)"></i>
              <i class="m7" :class="{active: post.f === 'm7'}" value="m7" @click="dora($event)"></i>
              <i class="m8" :class="{active: post.f === 'm8'}" value="m8" @click="dora($event)"></i>
              <i class="m9" :class="{active: post.f === 'm9'}" value="m9" @click="dora($event)"></i>
              <i class="m5r" :class="{active: post.f === 'm5r'}" value="m5r" @click="dora($event)"></i>
              <i class="p1" :class="{active: post.f === 'p1'}" value="p1" @click="dora($event)"></i>
              <i class="p2" :class="{active: post.f === 'p2'}" value="p2" @click="dora($event)"></i>
              <i class="p3" :class="{active: post.f === 'p3'}" value="p3" @click="dora($event)"></i>
              <i class="p4" :class="{active: post.f === 'p4'}" value="p4" @click="dora($event)"></i>
              <i class="p5" :class="{active: post.f === 'p5'}" value="p5" @click="dora($event)"></i>
              <i class="p6" :class="{active: post.f === 'p6'}" value="p6" @click="dora($event)"></i>
              <i class="p7" :class="{active: post.f === 'p7'}" value="p7" @click="dora($event)"></i>
              <i class="p8" :class="{active: post.f === 'p8'}" value="p8" @click="dora($event)"></i>
              <i class="p9" :class="{active: post.f === 'p9'}" value="p9" @click="dora($event)"></i>
              <i class="p5r" :class="{active: post.f === 'p5r'}" value="p5r" @click="dora($event)"></i>
              <i class="s1" :class="{active: post.f === 's1'}" value="s1" @click="dora($event)"></i>
              <i class="s2" :class="{active: post.f === 's2'}" value="s2" @click="dora($event)"></i>
              <i class="s3" :class="{active: post.f === 's3'}" value="s3" @click="dora($event)"></i>
              <i class="s4" :class="{active: post.f === 's4'}" value="s4" @click="dora($event)"></i>
              <i class="s5" :class="{active: post.f === 's5'}" value="s5" @click="dora($event)"></i>
              <i class="s6" :class="{active: post.f === 's6'}" value="s6" @click="dora($event)"></i>
              <i class="s7" :class="{active: post.f === 's7'}" value="s7" @click="dora($event)"></i>
              <i class="s8" :class="{active: post.f === 's8'}" value="s8" @click="dora($event)"></i>
              <i class="s9" :class="{active: post.f === 's9'}" value="s9" @click="dora($event)"></i>
              <i class="s5r" :class="{active: post.f === 's5r'}" value="s5r" @click="dora($event)"></i>
              <i class="we" :class="{active: post.f === 'we'}" value="we" @click="dora($event)"></i>
              <i class="ws" :class="{active: post.f === 'ws'}" value="ws" @click="dora($event)"></i>
              <i class="ww" :class="{active: post.f === 'ww'}" value="ww" @click="dora($event)"></i>
              <i class="wn" :class="{active: post.f === 'wn'}" value="wn" @click="dora($event)"></i>
              <i class="dw" :class="{active: post.f === 'dw'}" value="dw" @click="dora($event)"></i>
              <i class="db" :class="{active: post.f === 'db'}" value="db" @click="dora($event)"></i>
              <i class="dr" :class="{active: post.f === 'dr'}" value="dr" @click="dora($event)"></i>
            </div>
          </div>
        </div>
        <h3>手牌を入力してください</h3>
        <div class="post__set">
          <div>※同種の牌はドラ表示牌を含めて最大４枚、赤ドラは最大１枚です</div>
          <div>※下記の牌クリックで追加、画面下部の手牌クリックで削除</div>
          <div class="m-cards">
            <i class="m1" value="m1" @click="addCard($event)"></i>
            <i class="m2" value="m2" @click="addCard($event)"></i>
            <i class="m3" value="m3" @click="addCard($event)"></i>
            <i class="m4" value="m4" @click="addCard($event)"></i>
            <i class="m5" value="m5" @click="addCard($event)"></i>
            <i class="m6" value="m6" @click="addCard($event)"></i>
            <i class="m7" value="m7" @click="addCard($event)"></i>
            <i class="m8" value="m8" @click="addCard($event)"></i>
            <i class="m9" value="m9" @click="addCard($event)"></i>
            <i class="m5r" value="m5r" @click="addCard($event)"></i>
            <i class="p1" value="p1" @click="addCard($event)"></i>
            <i class="p2" value="p2" @click="addCard($event)"></i>
            <i class="p3" value="p3" @click="addCard($event)"></i>
            <i class="p4" value="p4" @click="addCard($event)"></i>
            <i class="p5" value="p5" @click="addCard($event)"></i>
            <i class="p6" value="p6" @click="addCard($event)"></i>
            <i class="p7" value="p7" @click="addCard($event)"></i>
            <i class="p8" value="p8" @click="addCard($event)"></i>
            <i class="p9" value="p9" @click="addCard($event)"></i>
            <i class="p5r" value="p5r" @click="addCard($event)"></i>
            <i class="s1" value="s1" @click="addCard($event)"></i>
            <i class="s2" value="s2" @click="addCard($event)"></i>
            <i class="s3" value="s3" @click="addCard($event)"></i>
            <i class="s4" value="s4" @click="addCard($event)"></i>
            <i class="s5" value="s5" @click="addCard($event)"></i>
            <i class="s6" value="s6" @click="addCard($event)"></i>
            <i class="s7" value="s7" @click="addCard($event)"></i>
            <i class="s8" value="s8" @click="addCard($event)"></i>
            <i class="s9" value="s9" @click="addCard($event)"></i>
            <i class="s5r" value="s5r" @click="addCard($event)"></i>
            <i class="we" value="we" @click="addCard($event)"></i>
            <i class="ws" value="ws" @click="addCard($event)"></i>
            <i class="ww" value="ww" @click="addCard($event)"></i>
            <i class="wn" value="wn" @click="addCard($event)"></i>
            <i class="dw" value="dw" @click="addCard($event)"></i>
            <i class="db" value="db" @click="addCard($event)"></i>
            <i class="dr" value="dr" @click="addCard($event)"></i>
          </div>
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
        <div class="post__display__cards">
          <i v-show=post.cards[0] :class=post.cards[0] data-index="0" @click="removeCard($event)"></i>
          <i v-show=post.cards[1] :class=post.cards[1] data-index="1" @click="removeCard($event)"></i>
          <i v-show=post.cards[2] :class=post.cards[2] data-index="2" @click="removeCard($event)"></i>
          <i v-show=post.cards[3] :class=post.cards[3] data-index="3" @click="removeCard($event)"></i>
          <i v-show=post.cards[4] :class=post.cards[4] data-index="4" @click="removeCard($event)"></i>
          <i v-show=post.cards[5] :class=post.cards[5] data-index="5" @click="removeCard($event)"></i>
          <i v-show=post.cards[6] :class=post.cards[6] data-index="6" @click="removeCard($event)"></i>
          <i v-show=post.cards[7] :class=post.cards[7] data-index="7" @click="removeCard($event)"></i>
          <i v-show=post.cards[8] :class=post.cards[8] data-index="8" @click="removeCard($event)"></i>
          <i v-show=post.cards[9] :class=post.cards[9] data-index="9" @click="removeCard($event)"></i>
          <i v-show=post.cards[10] :class=post.cards[10] data-index="10" @click="removeCard($event)"></i>
          <i v-show=post.cards[11] :class=post.cards[11] data-index="11" @click="removeCard($event)"></i>
          <i v-show=post.cards[12] :class=post.cards[12] data-index="12" @click="removeCard($event)"></i>
          <i v-show=post.cards[13] :class=post.cards[13] data-index="13" @click="removeCard($event)"></i>
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
      state: 1,
      modal: {
        show: false,
        ttl: '',
        content: ''
      },
      sortCardItems: ["m1", "m2", "m3", "m4", "m5", "m5r", "m6", "m7", "m8", "m9", "p1", "p2", "p3", "p4", "p5", "p5r", "p6", "p7", "p8", "p9", "s1", "s2", "s3", "s4", "s5", "s5r", "s6", "s7", "s8", "s9", "we", "ws", "ww", "wn", "dw", "db", "dr", null],
      cardFull: false,
      post: {
        cards: new Array(14).fill(null),
        a: false,
        b: false,
        c: '0',
        d: false,
        e: '4',
        f: false,
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
      if(this.post.e === '２１') return false
      const s = Number(this.toHalfwidth(this.post.e)) + 1
      this.post.e = this.toFullwidth(String(s))
    },
    countDown() {
      if(this.post.e === '０') return false
      const s = Number(this.toHalfwidth(this.post.e)) - 1
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