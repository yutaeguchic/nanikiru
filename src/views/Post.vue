<template>
  <div class="post">
    <h2>NANIKIRU POST (問題作成)</h2>
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
      <div>{{post}}</div>
      <div class="pagination">
        <button :class="prevAble()?'pagi__prev':'pagi__prev--disabled'" :disabled="!prevAble()" @click="prev()">Prev</button>
        <button :class="nextAble()?'pagi__next':'pagi__next--disabled'" :disabled="!nextAble()" @click="next()">Next</button>
      </div>
    </form>
    <div class="post__display">
      <div>
        <ul class="post__display__status">
          <li v-show="post.a && post.b">{{post.a}}{{post.b}}</li>
          <li v-show="post.c">{{post.c}}本場</li>
          <li v-show="post.d">{{post.d}}家</li>
          <li v-show="post.e">{{post.e}}巡目</li>
          <li class="post__display__status__dora" v-show="post.f">ドラ表示牌 <i class="m-card" :class="post.f"></i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  data() {
    return {
      state: 2,
      sortCard: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m5r", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p5r", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s5r", "we", "ws", "ww", "wn", "dw", "db", "dr"],
      post: {
        cards: new Array(13).fill(false),
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
      this.post.f = event.target.classList.value
    },
    addCard(event) {
      console.log(event)
    },
    prevAble() {
      return (this.state != 1)
    },
    nextAble() {
      return (this.state === 1 && this.post.a && this.post.b && this.post.c && this.post.d && this.post.e)
    },
    prev() {
      this.state -= 1
      this.$SmoothScroll(document.body, 400)
    },
    next() {
      if(this.state === 1) {
        this.state += 1
        this.$SmoothScroll(document.body, 400)
      }else {
        console.log('gole')
      }
    },
    scrollTop() {

    }
  }
}
</script>