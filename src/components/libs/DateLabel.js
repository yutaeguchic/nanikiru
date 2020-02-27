export default {
  methods: {
    getDateLabel(timestamp) {
      const seconds = timestamp.seconds
      const a = new Date(seconds * 1000)
      const year = a.getFullYear()
      const month = a.getMonth()+1
      const date = a.getDate()
      const hours = a.getHours()
      const minutes = a.getMinutes()
      return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes
    }
  }
}