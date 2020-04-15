class OGPIMG {
  constructor() {
    this.height = 315
    this.width = 600
    this.$canvas = document.getElementById('canvas')
    this.ctx = this.$canvas.getContext('2d')
    this.src = {
      background : '/img/ogp.png',
      cards: '/img/cards.png'
    }
  }

  init() {
    const BACKGROUND = new Image()
    BACKGROUND.addEventListener('load', ()=> {
      this.ctx.drawImage(this, 0, 0, this.width, this.height)
    })
    BACKGROUND.src = this.src.background
  }
}

export default {
  monted() {
    const ogpImg = new OGPIMG()
    ogpImg.init()
  }
}