<template>
  <button
    class="btn"
    :class="{
      'btn-primary': isPrimary,
      'btn-secondary': isSecondary,
      'btn-neutral': isNeutral,
      'btn-accent': isAccent,
    }"
    :type="type ?? 'button'"
    @click="$emit('click')"
  >
    <span
      v-if="isLoading"
      class="loading loading-spinner"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
  import type { ButtonHTMLAttributes } from 'vue'

  defineProps<{
    isLoading?: boolean
    isPrimary?: boolean
    isSecondary?: boolean
    isNeutral?: boolean
    isAccent?: boolean
    type?: ButtonHTMLAttributes['type']
  }>()

  defineEmits<{
    click: [void]
  }>()
</script>
