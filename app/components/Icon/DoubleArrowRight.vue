<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="min-w-[16px]"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M13 6L19 12L13 18"
      :class="strokeColor ?? 'stroke-current'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <path
      d="M5 6L11 12L5 18"
      :class="strokeColor ?? 'stroke-current'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
  import { getIconSize, type StrokeIconProps } from '~/components/Icon/utils'

  defineProps<StrokeIconProps>()
</script>
