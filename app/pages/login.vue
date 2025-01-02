<template>
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
  import { definePageMeta } from '#imports'

  useHead({
    title: 'Login',
  })

  definePageMeta({
    middleware: ['not-auth'],
  })

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
