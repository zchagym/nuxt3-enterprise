<template>
  <NuxtLink
      :to="`/posts/${post.id}`"
      class="flex gap-3 border rounded p-3 hover:bg-gray-50 dark:hover:bg-slate-700"
  >
    <!-- 封面图 -->
    <NuxtImg
        :src="post.cover"
        format="webp"
        width="120"
        height="90"
        placeholder="blur"
        class="rounded object-cover"
    />

    <!-- 文本信息 -->
    <div class="flex-1">
      <h2 class="font-semibold text-lg mb-1 line-clamp-2">
        {{ post.title }}
      </h2>
      <p class="text-sm text-gray-500 line-clamp-2">{{ post.excerpt }}</p>
      <p class="text-xs mt-1 text-gray-400">
        {{ post.author }} · {{ post.createdAt }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ post: any }>()
</script>
