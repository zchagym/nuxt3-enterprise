import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'          // 让 .vue 能被 Vite 解析
import { resolve } from 'pathe'

export default defineConfig({
    plugins: [vue()],

    test: {
        // 仅收集你 repo 里 tests/unit 下的用例
        include: ['tests/unit/**/*.spec.{ts,js}'],

        // 不要扫描 node_modules / e2e
        exclude: ['node_modules', 'tests/e2e'],

        environment: 'jsdom',
        globals: true,
        setupFiles: resolve(__dirname, 'tests/setup.ts'),
        coverage: { reporter: ['text', 'html'] }
    },

    // 让 Vitest 认得 Nuxt 的别名 @ 和 ~
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
            '~': resolve(__dirname, './')
        }
    }
})
