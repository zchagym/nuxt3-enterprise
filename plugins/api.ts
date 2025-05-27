import { useRequestHeaders } from '#app'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    const api = $fetch.create({
        baseURL: '/api',
        credentials: 'include',
        // ⭐ 关键：仅在服务端将浏览器的 cookie 头透传
        headers: process.server ? useRequestHeaders(['cookie']) : undefined,

        onResponseError({ response }) {
            if (response.status === 401) {
                auth.$reset()
                if (process.client) navigateTo('/login')
            }
        }
    })

    return { provide: { api } }
})
