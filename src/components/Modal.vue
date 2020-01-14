<template>
  <div class="m-modal" @click.self="$emit('close')">
    <div class="m-modal__content">
      <slot name="header"></slot>
      <slot name="content"></slot>
      <button class="m-modal__close" type="button" @click.stop="$emit('close')"><i class="icon-close"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>