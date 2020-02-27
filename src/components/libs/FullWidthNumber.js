export default {
  methods: {
    getFullWidthNumberArray(n) {
      return Array.from({length: n}, (_, i) => this.toFullwidth(i + ''))
    },
    toFullwidth(str) {
      return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248)
      })
    }
  }
}