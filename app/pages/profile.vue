<template>
  <div>{{ user?.email }}</div>
  <div>{{ user?.user_metadata.name }}</div>
  <div>{{ user?.created_at }}</div>

  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  async function logout(): Promise<void> {
    await supabase.auth.signOut()
    await navigateTo('/')
  }
</script>
