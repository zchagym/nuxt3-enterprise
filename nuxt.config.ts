import persistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@unocss/nuxt'],
  css: ['@/assets/main.css'],
  // Pinia 持久化
  pinia: { autoImports: ['defineStore'], plugins: [persistedstate] },
  // 公共运行时配置
  runtimeConfig: {
    public: { authCookieName: 'token' }
  }
})
