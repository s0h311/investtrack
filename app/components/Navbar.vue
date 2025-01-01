<template>
  <nav class="shadow rounded-md px-5 py-2 flex justify-between">
    <NuxtLink to="/">Invest Track</NuxtLink>

    <div v-if="user" class="space-x-5">
      <NuxtLink to="/dashboard" :class="route.fullPath === '/dashboard' ? 'underline' : ''">Dashboard</NuxtLink>
      <NuxtLink to="/profile" :class="route.fullPath === '/profile' ? 'underline' : ''">Profile</NuxtLink>
    </div>

    <div v-else class="space-x-5">
      <NuxtLink to="/login" :class="route.fullPath === '/login' ? 'underline' : ''">Login</NuxtLink>
      <NuxtLink to="/register" :class="route.fullPath === '/register' ? 'underline' : ''">Register</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const user = useSupabaseUser()

  const route = useRoute()
</script>
