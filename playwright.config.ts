import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'tests/e2e',              // 只扫 e2e
    // 或者 testMatch: /.*\.e2e\.ts$/,

    webServer: {
        command: 'npm run dev',          // 不依赖 pnpm
        port: 3000,
        reuseExistingServer: true,
        timeout: 120_000,
    },

    use: {
        baseURL: 'http://localhost:3000',
        navigationTimeout: 30_000,   // 给首屏编译和 HMR 足够时间
    },
})
