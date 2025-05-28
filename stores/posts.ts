import { defineStore } from 'pinia'

interface ListState {
    data: any[]
    total: number
    pageSize: number
}

export const usePostStore = defineStore('posts', {
    state: () => ({
        list: {} as Record<number, ListState>, // page -> data
        detail: {} as Record<number, any>,
    }),
    actions: {
        setList(page: number, payload: ListState) {
            this.list[page] = payload
        },
        setDetail(id: number, post: any) {
            this.detail[id] = post
        },
    },
})
