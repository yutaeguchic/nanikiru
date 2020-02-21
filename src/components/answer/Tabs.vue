<template>
  <ul class="answer__tabs">
    <li :class="{active:mode===1}" @click="$emit('change', 1)">Answer</li>
    <li :class="{active:mode===2}" @click="$emit('change', 2)">NANIKIRU</li>
    <li :class="{active:mode===3}" @click="$emit('change', 3)"><i class="icon-bubble"></i></li>
  </ul>
</template>

<script>
export default {
  name: 'answerTabs',
  props: ['mode']
}
</script>