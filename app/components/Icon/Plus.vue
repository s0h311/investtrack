<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="min-w-[16px]"
    :width="size ?? getIconSize($props)"
    :height="size ?? getIconSize($props)"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 12H12M18 12H12M12 12V6M12 12V18"
      :class="strokeColor ?? 'stroke-current'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
</template>

<script setup lang="ts">
  import { getIconSize, type StrokeIconProps } from '~/components/Icon/utils'

  defineProps<StrokeIconProps>()
</script>
