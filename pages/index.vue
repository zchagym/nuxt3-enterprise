<template>
  <div>
    <h1 class="text-xl font-semibold">Home Page</h1>
    <p>Welcome, {{ user?.username || 'Guest' }} 👋</p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const user = computed(() => auth.user)
</script>
