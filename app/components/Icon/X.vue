<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="min-w-[16px]"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
  >
    <path
      d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
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
