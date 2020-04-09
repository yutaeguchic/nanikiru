<template>
  <div v-if="cards" class="m-box__cards">
    <i v-for="(card, i) of cards" :key="i" class="large" :class="[card, {select: select} ,{active: answerCard === card}]" :data-val="card" @click="select?click($event):false"></i>
  </div>
</template>

<script>
  export default {
    name: 'LargeCards',
    props: [
      'cards',
      'select',
      'answerCard'
    ],
    methods: {
      click($event) {
        this.$emit('event', $event)
      }
    }
  }
</script>