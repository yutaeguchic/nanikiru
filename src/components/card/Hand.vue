<template>
  <div :class="className">
    <i
      v-for="i of 14"
      :key="i"
      v-show="items[i-1]"
      :class="items[i-1]"
      :data-index="dataIndex?(i-1):false"
      @click="clickEvent?submit($event):false"></i>
  </div>
</template>

<script>
export default {
  name: 'Hand',
  props:[
    'className',
    'items',
    'dataIndex',
    'clickEvent'
  ],
  methods: {
    submit($event) {
      this.$emit('event', $event)
    }
  }
}
</script>