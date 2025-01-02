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

    <Cta
      is-primary
      :isLoading
      type="submit"
    >
      Register
    </Cta>
  </Form>
</template>

<script setup lang="ts">
  useHead({
    title: 'Register',
  })

  const supabase = useSupabaseClient()

  const isLoading = ref<boolean>(false)

  async function register({ name, email }: { name: string; email: string }): Promise<void> {
    isLoading.value = true

    await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          name,
        },
        shouldCreateUser: true,
      },
    })

    isLoading.value = false
    await navigateTo(`/otp?email=${email}`)
  }
</script>
