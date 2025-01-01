<template>
  <h1>Register page</h1>

  <form @submit.prevent="register">
    <input name="name" placeholder="John Doe" type="text" required />
    <input name="email" placeholder="john@doe.com" type="email" required />

    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()

  async function register(event: Event): Promise<void> {
    const inputElement = event.target as HTMLFormElement

    const formData = new FormData(inputElement)

    const name = formData.get('name') as string
    const email = formData.get('email') as string

    await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          name,
        },
        shouldCreateUser: true,
      },
    })

    await navigateTo(`/otp?email=${email}`)
  }
</script>
