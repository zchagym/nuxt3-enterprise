export const useAuth = () => {
    const store = useAuthStore()
    if (process.client && !store.user) store.refresh() // 首屏刷新 Cookie

    return {
        user: computed(() => store.user),
        isLoggedIn: computed(() => store.isLoggedIn),
        login: store.login,
        logout: store.logout
    }
}
