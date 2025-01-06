<template>
  <form
    class="grid gap-3 max-w-sm *:max-w-sm"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<script setup lang="ts" generic="T">
  const emit = defineEmits<{
    (e: 'formSubmit', data: T): void
  }>()

  function handleSubmit(event: Event): void {
    const form = event.target as HTMLFormElement

    const formData = new FormData(form)

    const data: Record<string, string> = {}

    for (const entry of formData.entries()) {
      const [key, value] = entry as [string, string]

      data[key] = value
    }

    emit('formSubmit', data as T)

    form.reset()
  }
</script>
