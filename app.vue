<template>
  <div :class="color.preference">
    <NuxtLoadingIndicator />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const color = useColorMode()
</script>
