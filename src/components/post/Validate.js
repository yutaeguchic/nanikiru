export default {
  methods: {
    $_isExistData(arr) {
      for(let i = 0; i < arr.length; i++) {
        const data = this.post[arr[i]]
        if(!data) return false
      }
      return true
    },
    $_isExceedText(s, max) { //trueにて弾く
      return s.length > max
    },
    $_isExceedCard(val) { //trueにて弾く
      return ((val === 'm5r' || val === 'p5r' || val === 's5r') && (this.post.f.some(e => e === val)) || this.post.f.filter((e)=> {return e === val || e === val.replace('r', '')}).length >= 4) || (this.post.f.filter((e)=> {return e === val || e === val+'r'}).length >= 4)
    }
  }
}