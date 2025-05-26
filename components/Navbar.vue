<template>
  <header class="flex items-center gap-4 p-4 border-b">
    <NuxtLink to="/" class="font-bold">Nuxt3-Enterprise</NuxtLink>
    <div class="ml-auto flex items-center gap-2">
      <NuxtLink v-if="!isLoggedIn" to="/login">Login</NuxtLink>
      <button v-else @click="logout" class="text-red-500">Logout</button>
    </div>
  </header>
</template>

<script setup lang="ts">
const auth = useAuth()
const isLoggedIn = computed(() => auth.isLoggedIn)
const logout = () => auth.logout()
</script>
