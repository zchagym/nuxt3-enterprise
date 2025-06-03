import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { mockApi } from '../setup'          // ← 引入刚才导出的 mock
import { describe, it, expect, beforeEach } from 'vitest'

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        mockApi.mockReset().mockResolvedValue({
            user: { id: 1, username: 'demo' }
        })
    })

    it('login sets user', async () => {
        const store = useAuthStore()
        await store.login('demo', 'demo')
        expect(store.isLoggedIn).toBe(true)
        expect(store.user?.username).toBe('demo')
        expect(mockApi).toHaveBeenCalledWith('/auth/login', expect.anything())
    })
})
