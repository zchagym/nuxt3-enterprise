import persistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@nuxt/image',
        '@nuxtjs/i18n',     // ← 新增
        '@nuxtjs/color-mode' // ← 新增
    ],
    css: ['@/assets/main.css'],
    // Pinia 持久化
    pinia: {autoImports: ['defineStore'], plugins: [persistedstate]},
    // 公共运行时配置
    runtimeConfig: {
        public: {authCookieName: 'token'}
    },
    image: {
        // domains: ['source.unsplash.com'],
        // presets: { ... }
    },

    i18n: {
        locales: [
            { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
            { code: 'zh', name: '简体中文', iso: 'zh-CN', file: 'zh.json' }
        ],
        detectBrowserLanguage: false,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        lazy: true,
        langDir: 'locales',          // 注意不要带尾部斜杠
        vueI18n: './i18n.config.ts'  // 只留文件路径 / 或直接删掉也行
    },
    colorMode: {
        classSuffix: '',
        preference : 'system', // 跟随系统
        fallback   : 'light'
    }
})
