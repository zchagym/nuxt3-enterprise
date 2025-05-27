<template>
  <div class="max-w-sm mx-auto mt-10">
    <h1 class="text-lg font-semibold mb-4">Login</h1>
    <form @submit.prevent="handle">
      <input v-model="username" placeholder="username" class="border p-2 w-full mb-3"/>
      <input v-model="password" type="password" placeholder="password" class="border p-2 w-full mb-3"/>
      <button class="bg-green-600 text-white py-2 px-4 w-full">Sign in</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const username = ref('demo')
const password = ref('demo')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function handle () {
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Wrong credential'
  }
}
</script>
