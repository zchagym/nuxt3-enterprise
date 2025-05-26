import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
    const store = useAuthStore()

    async function login (username: string, password: string) {
        try {
            const { data, error } = await useFetch<{ token: string; user: any }>('/api/auth/login', {
                method: 'POST',
                body: { username, password }
            })
            if (error.value) throw error.value

            store.setToken(data.value!.token)
            store.setUser(data.value!.user)
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    function logout () {
        store.$reset()
        navigateTo('/login')
    }

    return { login, logout, user: store.user, isLoggedIn: store.isLoggedIn }
}
