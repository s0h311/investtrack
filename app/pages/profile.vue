<template>
  <div class="shadow w-fit p-3 rounded-md mx-auto">
    Hi
    <span class="text-sky-700 font-semibold"> {{ user?.user_metadata.name }}</span
    >, your E-Mail address is <span class="text-sky-700 font-semibold"> {{ user?.email }}</span> and your are a member
    here since
    <span
      v-if="user?.created_at"
      class="text-sky-700 font-semibold"
    >
      {{ formatDateFromString(user.created_at) }}</span
    >. If you want to logout

    <Cta
      is-primary
      is-link
      :isLoading
      type="submit"
      @click="logout"
    >
      click here.
    </Cta>
  </div>
</template>

<script setup lang="ts">
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const isLoading = ref<boolean>(false)

  async function logout(): Promise<void> {
    isLoading.value = true

    await supabase.auth.signOut()

    isLoading.value = false
    await navigateTo('/')
  }
</script>
