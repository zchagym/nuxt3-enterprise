import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id:number; username:string }
    }),
    getters: {
        isLoggedIn: state => !!state.user
    },
    actions: {
        setUser (u:any) { this.user = u },
        async login (username:string, password:string) {
            const { $api } = useNuxtApp()
            const { user } = await $api('/auth/login', { method:'POST', body:{ username, password } })
            this.user = user
            return true
        },
        async refresh () {
            const { $api } = useNuxtApp()
            const { user } = await $api('/auth/refresh')
            this.user = user
        },
        async logout () {
            const { $api } = useNuxtApp()
            await $api('/auth/logout', { method:'POST' })
            this.$reset()
            if (process.client) navigateTo('/login')
        }
    },
    persist: true
})
