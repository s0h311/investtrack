<template>
  <h1>Login page</h1>

  <form @submit.prevent="login">
    <input
      name="email"
      placeholder="john@doe.com"
      type="email"
      required
    />

    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()

  async function login(event: Event): Promise<void> {
    const inputElement = event.target as HTMLFormElement

    const formData = new FormData(inputElement)

    const email = formData.get('email') as string

    await supabase.auth.signInWithOtp({
      email,
    })

    await navigateTo(`/otp?email=${email}`)
  }
</script>
