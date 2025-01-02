<template>
  <Form @form-submit="login">
    <input
      name="token"
      placeholder="123456"
      type="text"
      maxlength="6"
      minlength="6"
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
  const route = useRoute()

  const isLoading = ref<boolean>(false)

  async function login({ token }: { token: string }): Promise<void> {
    isLoading.value = true

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

    isLoading.value = false
    await navigateTo('/')
  }
</script>
