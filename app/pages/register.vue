<template>
  <h1>Register page</h1>

  <Form @form-submit="register">
    <input
      name="name"
      placeholder="John Doe"
      type="text"
      required
    />

    <input
      name="email"
      placeholder="john@doe.com"
      type="email"
      required
    />

    <button type="submit">Register</button>
  </Form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()

  async function register({ name, email }: { name: string; email: string }): Promise<void> {
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
