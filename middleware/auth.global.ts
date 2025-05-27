export default defineNuxtRouteMiddleware(async (to) => {
    const white = ['/login', '/404']
    const auth = useAuthStore()
    if (white.includes(to.path)) return

    if (!auth.isLoggedIn) {
        try {
            await auth.refresh()
        } catch {
            return navigateTo('/login')
        }
    }
})
