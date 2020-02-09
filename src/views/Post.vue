<template>
  <div class="content-post">
    <breadcrumb
      text="NANIKIRU 作成"
    />

    <h2 class="m-ttl--page">NANIKIRU 作成 <span v-show="state!=4">{{state}}/3ページ</span></h2>
    <form>
      <div v-show="state===1">
        <h3 class="m-ttl--section">局を選択してください</h3>
        <div class="m-box">
          <div class="postSet--radioWrap">
            <input id="a1" class="m-radio" type="radio" value="東" v-model="post.g"><label for="a1">東</label>
            <input id="a2" class="m-radio" type="radio" value="南" v-model="post.g"><label for="a2">南</label>
          </div>
          <ul class="postSet--radioWrap">
            <li v-for="i of 4" :key="i"><input :id="'b'+i" class="m-radio" type="radio" :value="numLabel[i]+'局'" v-model="post.h"><label :for="'b'+i">{{numLabel[i]}}局</label></li>
          </ul>
        </div>

        <h3 class="m-ttl--section">本場数を選択してください</h3>
        <div class="m-box">
          <ul class="postSet--radioWrap">
            <li v-for="i of 9" :key="i"><input :id="'c'+(i-1)" class="m-radio" type="radio" :value="numLabel[i-1]" v-model="post.i"><label :for="'c'+(i-1)">{{numLabel[i-1]}}</label></li>
          </ul>
        </div>

        <h3 class="m-ttl--section">自風を選択してください</h3>
        <div class="m-box">
          <ul class="postSet--radioWrap">
            <li v-for="(direction, i) of directions" :key="direction"><input :id="'d'+(i+1)" class="m-radio" type="radio" :value="direction" v-model="post.j"><label :for="'d'+(i+1)">{{direction}}</label></li>
          </ul>
        </div>

        <h3 class="m-ttl--section">巡目を入力してください</h3>
        <div class="m-box">
          <div class="postSet--rangeWrap">
            <input id="e" class="m-range" type="range" :min="numTour.min" :max="numTour.max" step="1" value="1" v-model="numTour.val" @change="post.k = toFullwidth($event.target.value)">
            <label>{{post.k}}巡目<i class="icon-down" @click="countDown()"></i><i class="icon-up" @click="countUp()"></i></label>
          </div>
        </div>
      </div><!-- /.state1 -->

      <div v-show="state===2">
        <h3 class="m-ttl--section">ドラ表示牌を選択してください</h3>
        <div class="m-box">
          <div class="m-box__note">※ドラが<i class="m-card m1"></i>の場合は<i class="m-card m9"></i>を、ドラが<i class="m-card dw"></i>の場合は<i class="m-card dr"></i>を選択</div>
          <div class="m-box__note">※手牌と合わせ同種の牌は最大４枚、赤ドラは最大１枚です<br>(ページ遷移時に判定されます)</div>
          <div class="postSet--cardWrap">
            <div class="m-box__cards">
              <i v-for="i of 37" :key="i" class="large select" :class="[sortCardItems[i-1], {active: post.l === sortCardItems[i-1]}]" :data-value="sortCardItems[i-1]" @click="setDora($event)"></i>
            </div>
          </div>
        </div>

        <h3 class="m-ttl--section">手牌を入力してください</h3>
        <div class="m-box">
          <div class=m-box__note>※同種の牌はドラ表示牌を含めて最大４枚、赤ドラは最大１枚です</div>
          <div class=m-box__note><strong>※下記の牌クリックで追加、画面下部の手牌クリックで削除</strong></div>
          <div class="m-box__cards">
            <i v-for="i of 37" :key="i" class="large select" :class="sortCardItems[i-1]" :data-value="sortCardItems[i-1]" @click="addCard($event)"></i>
          </div>
        </div>

        <h3 class="m-ttl--section">戦況・コメント等を入力してください(空白可)</h3>
        <div class="m-box">
          <div class="m-box__note">※上限1000文字</div>
          <textarea class="postSet--textarea" :maxlength="maxlength.condition" v-model="post.m"></textarea>
        </div>
      </div><!-- /.state2 -->

      <div v-show="state===3">
        <h3 class="m-ttl--section">正答牌を選択してください</h3>
        <div class="m-box">
          <div class="m-box__note">※「正解なし」を選択した場合NANIKIRUは「相談」モードとなります</div>
          <div class="m-box__note">※正解に選択された牌と同種の牌が手牌に入っている際、すべて正解として扱われます、ただし赤ドラは別種として扱われます<br>(例えば正解を<i class="m-card m5"></i>とした際<i class="m-card m5r"></i>は不正解となります)</div>
          <input id="g" class="postSet--switch" type="checkbox" value="null" v-model="post.e"><label for="g" data-on="正解あり" data-off="正解なし" checked></label>
          <transition name="fadeInDown">
            <div v-show="post.e" class="m-box__cards">
              <i v-for="i of 14" :key="i" v-show="post.f[i-1]" class="large select" :class="[post.f[i-1], {active: post.n === post.f[i-1]}]" :data-value="post.f[i-1]" @click="setAnswerCard($event)"></i>
            </div>
          </transition>
        </div>

        <transition name="fadeInDown">
          <div v-show="post.e">
            <h3 class="m-ttl--section">正答の解説を入力してください</h3>
            <div class="m-box">
              <div class=m-box__note><strong>※「正解あり」の場合、記入は必須となります</strong></div>
              <div class=m-box__note>※上限1000文字</div>
              <textarea class="postSet--textarea" :maxlength="maxlength.commentary" v-model="post.o"></textarea>
            </div>
          </div>
        </transition>

        <h3 class="m-ttl--section">問題のタイトルを入力してください</h3>
        <div class="m-box">
          <div class="m-box__note">※無記入の場合は『無題』となります</div>
          <div class="m-box__note">※最大{{maxlength.title}}文字です</div>
          <input class="postSet--text" type="text" maxlength="32" v-model="post.d">
        </div>
      </div>

      <div v-show="state===4">
        <h3 class="m-ttl--section">以下の内容で<strong>NANIKIRU</strong>を投稿してよろしいですか？</h3>
        <div class="postConfirm">
          <h4 class="m-box__strong">タイトル</h4>
          <div v-text="post.d.trim()?post.d:'無題'"></div>
          <h4 class="m-box__strong">投稿者</h4>
          <div>{{currentUser.db.displayName}}(@{{currentUser.db.username}})</div>
          <h4 class="m-box__strong">手牌</h4>
          <div>
            <ul class="m-box__status">
              <li>{{post.g}}{{post.h}}</li>
              <li>{{post.i}}本場</li>
              <li>{{post.j}}家</li>
              <li>{{post.k}}巡目</li>
              <li class="m-box__card">ドラ表示牌<i :class="post.l"></i></li>
            </ul>
            <div class="m-box__cards"><i v-for="i of 14" :key="i" :class="[{active: post.n===post.f[i-1]}, post.f[i-1]]"></i></div>
          </div>
          <h4 class="m-box__strong">戦況・コメント</h4>
          <div v-text="post.m.trim()?post.m:'なし'"></div>
          <template v-if="post.e">
            <h4 class="m-box__strong">解説</h4>
            <div>{{post.o}}</div>
          </template>
        </div>
      </div>

      <div>
        <button type="button" :class="isPrev()?'m-btn--able':'m-btn--disabled'" :disabled="!isPrev()" @click="move(-1)">Prev</button>
        <button v-if="this.state!=4" type="button" :class="isNext()?'m-btn--able':'m-btn--disabled'" :disabled="!isNext()" @click="move(1)">Next</button>
        <button v-else type="button" :class="isNext()?'m-btn--able':'m-btn--disabled'" :disabled="!isNext()" @click="submit()">Post</button>
      </div>

    </form>
    <div v-show="state!=4" class="post__preview">
      <div>
        <ul class="post__preview__status">
          <li class="noBorder">プレビュー</li>
          <li v-show="post.g && post.h">{{post.g}}{{post.h}}</li>
          <li v-show="post.i">{{post.i}}本場</li>
          <li v-show="post.j">{{post.j}}家</li>
          <li v-show="post.k">{{post.k}}巡目</li>
          <li class="m-box__card" v-show="post.l">ドラ表示牌<i :class="post.l"></i></li>
          <li class="m-box__card" v-show="post.n && post.e">正答 <i :class="post.n"></i></li>
        </ul>
        <div v-show="state===2" class="m-box__cards">
          <i v-for="i of 14" :key="i" v-show="post.f[i-1]" class="removeBtn" :class="post.f[i-1]" :data-index="i-1" @click="removeCard($event)"></i>
        </div>
        <div v-show="state!=2" class="m-box__cards">
          <i v-for="i of 14" :key="i" v-show="post.f[i-1]" :class="post.f[i-1]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'post',
  components: {
    Breadcrumb
  },
  props: ['currentUser', 'modalText'],
  data() {
    return {
      state: 1, //ページ数
      directions: ['東', '南', '西', '北'],
      numLabel: Array.from({length:31}, (_, i) => this.toFullwidth(String(i))),
      sortCardItems: ['m1', 'm2', 'm3', 'm4', 'm5', 'm5r', 'm6', 'm7', 'm8', 'm9', 'p1', 'p2', 'p3', 'p4', 'p5', 'p5r', 'p6', 'p7', 'p8', 'p9', 's1', 's2', 's3', 's4', 's5', 's5r', 's6', 's7', 's8', 's9', 'we', 'ws', 'ww', 'wn', 'dw', 'db', 'dr', null],
      numTour: { //巡目
        val: 1,
        min: 1,
        max: 21
      },
      maxlength: {
        title: 32,
        condition: 1000,
        commentary: 1000
      },
      cardFull: false,
      post: {
        a: '',
        b: false,
        c: false,
        d: '',
        e: true,
        f: new Array(14).fill(null),
        g: '',
        h: '',
        i: '',
        j: '',
        k: '１',
        l: '',
        m: '',
        n: '',
        o: ''
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
      const s = Number(this.toHalfwidth(this.post.k)) + 1
      this.numTour.val = s
      this.post.k = this.toFullwidth(String(s))
    },
    countDown() {
      if(this.numTour.val === this.numTour.min) return false
      const s = Number(this.toHalfwidth(this.post.k)) - 1
      this.numTour.val = s
      this.post.k = this.toFullwidth(String(s))
    },
    setDora(event) {
      this.post.l = event.toElement.attributes['data-value'].value
    },
    addCard(event) {
      const val = event.toElement.attributes['data-value'].value
      if(!this.cardValidate(val) && !this.cardFull) {
        this.$set(this.post.f, this.post.f.indexOf(null), val)
        this.cardFull = (!this.post.f.some(e => e === null))
        this.sortCard()
      }
    },
    removeCard(event) {
      let index = event.toElement.attributes['data-index'].value
      this.post.f[index] = null
      this.sortCard()
      this.cardFull = false
    },
    setAnswerCard(event) {
      this.post.n = event.toElement.attributes['data-value'].value
    },
    sortCard() {
      this.post.f.sort((x, y) => {
        return this.sortCardItems.indexOf(x) - this.sortCardItems.indexOf(y)
      })
    },
    textValidate(s, max) { //trueにて弾く
      return s.length > max
    },
    cardValidate(val) { //trueにて弾く
      return ((val === 'm5r' || val === 'p5r' || val === 's5r') && (this.post.f.some(e => e === val)) || this.post.f.filter(function(e){return e === val || e === val.replace('r', '')}).length >= 4) || (this.post.f.filter(function(e){return e === val || e === val+'r'}).length >= 4)
    },
    isPrev() {
      return this.state != 1
    },
    isNext() {
      if(this.state === 1 || this.state === 4) {
        return this.post.g && this.post.h && this.post.i && this.post.j && this.post.k
      }else if(this.state === 2 || this.state === 4) {
        return this.post.l && this.cardFull
      }else if(this.state === 3 || this.state === 4) {
        return (this.post.e && this.post.n && this.post.o.trim()) || (!this.post.e)
      }else {
        return (this.state === 4)
      }
    },
    move(count) {
      if(this.post.l && this.cardValidate(this.post.l)) {
        this.$parent.modal = {
          able: true,
          text: this.modalText.post.errorDora,
          funcName: null
        }
      }else if(this.post.m && this.textValidate(this.post.m, this.maxlength.condition)) {
        this.$parent.modal = {
          able: true,
          text: this.modalText.post.errorCountCondition,
          funcName: null
        }
      }else if(this.post.n && this.textValidate(this.post.o, this.maxlength.commentary)) {
        this.$parent.modal = {
          able: true,
          text: this.modalText.post.errorCountCommentary,
          funcName: null
        }
      }else {
        this.state = this.state + count
        this.$SmoothScroll(document.body, 400)
        return false
      }
    },
    submit() {
      this.$SmoothScroll(document.body, 400)
      const time = firebase.firestore.FieldValue.serverTimestamp()
      this.post.a = this.currentUser.uid
      this.post.c = time
      this.post.d = this.post.d.trim()
      this.post.m = this.post.m.trim()
      this.post.o = this.post.e?this.post.o.trim():''
      const self = this
      firebase.firestore().collection('posts').add(self.post).then(() => {
        this.$emit('setDbPosts')
        this.$parent.modal = {
          able: true,
          text: this.modalText.post.posted,
          funcName: null
        }
        this.$router.push('/?modal')
      }).catch((err) => {
        console.log(err)
        this.$parent.modal = {
          able: true,
          text: this.modalText.post.errorPost,
          funcName: null
        }
      })
    }
  }
}
</script>