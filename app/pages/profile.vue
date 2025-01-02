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

    <button
      class="text-green-700 font-semibold"
      @click="logout"
    >
      click here.
    </button>
  </div>
</template>

<script setup lang="ts">
  import { formatDateFromString } from '~/utils/date'

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  async function logout(): Promise<void> {
    await supabase.auth.signOut()
    await navigateTo('/')
  }
</script>
