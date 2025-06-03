import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
    await page.goto('/login')

    /* 1️⃣ 等到登录表单渲染出来 */
    await page.waitForSelector('form', { timeout: 15_000 })

    /* 2️⃣ 输入账号密码（placeholder 小写） */
    await page.fill('input[placeholder="username"]', 'demo')
    await page.fill('input[placeholder="password"]', 'demo')

    /* 3️⃣ 点击按钮并等待首页出现 Logout */
    await Promise.all([
        page.waitForNavigation({ url: '**/' }),         // 跳到 /
        page.click('button:has-text("Sign in")')
    ])

    await expect(page.locator('text=Logout')).toBeVisible()
})
