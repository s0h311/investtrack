<template>
  <h1>Login page</h1>

  <Form @form-submit="login">
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
      Login
    </Cta>
  </Form>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()

  const isLoading = ref<boolean>(false)

  async function login({ email }: { email: string }): Promise<void> {
    isLoading.value = true

    await supabase.auth.signInWithOtp({
      email,
    })

    isLoading.value = false
    await navigateTo(`/otp?email=${email}`)
  }
</script>
