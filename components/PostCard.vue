<template>
  <NuxtLink
      :to="`/posts/${post.id}`"
      class="block border rounded p-4 hover:bg-gray-50 dark:hover:bg-slate-700"
  >
    <h2 class="font-semibold text-lg mb-1">{{ post.title }}</h2>
    <p class="text-sm text-gray-500">{{ post.excerpt }}</p>
    <p class="text-xs mt-2 text-gray-400">
      {{ post.author }} · {{ post.createdAt }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ post: any }>()
</script>
