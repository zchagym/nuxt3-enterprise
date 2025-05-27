<template>
  <!-- 带暗黑模式 class（Day5 会实现主题切换） -->
  <div :class="{ dark: isDark }">
    <!-- 全局加载进度条 -->
    <NuxtLoadingIndicator color="#16a34a" />

    <!-- 布局 & 页面渲染 -->
    <NuxtLayout>      <!-- layouts/default.vue 或其他 -->
      <NuxtPage />    <!-- 对应 pages/** -->
    </NuxtLayout>
  </div>
</template>
