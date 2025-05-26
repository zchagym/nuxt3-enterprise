import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '' as string,
        user: null as null | { id: number; username: string }
    }),
    getters: {
        isLoggedIn: state => !!state.token
    },
    actions: {
        setToken (t: string) {
            this.token = t
        },
        setUser (u: any) {
            this.user = u
        }
    },
    persist: true
})
