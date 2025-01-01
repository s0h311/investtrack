<template>
  <h1>Login page</h1>

  <Form @form-submit="login">
    <input
      name="email"
      placeholder="john@doe.com"
      type="email"
      required
    />

    <button type="submit">Login</button>
  </Form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()

  async function login({ email }: { email: string }): Promise<void> {
    await supabase.auth.signInWithOtp({
      email,
    })

    await navigateTo(`/otp?email=${email}`)
  }
</script>
