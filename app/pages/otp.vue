<template>
  <form @submit.prevent="login">
    <input
      name="token"
      placeholder="123456"
      type="text"
      required
    />

    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()
  const route = useRoute()

  async function login(event: Event): Promise<void> {
    const inputElement = event.target as HTMLFormElement

    const formData = new FormData(inputElement)

    const token = formData.get('token') as string

    const email = route.query.email as string

    const { error } = await supabase.auth.verifyOtp({
      type: 'email',
      email,
      token,
    })

    if (error) {
      // TODO handle error
      console.error(error)
    }

    await navigateTo('/')
  }
</script>
