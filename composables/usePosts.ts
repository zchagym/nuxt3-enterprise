export function usePosts () {
    async function fetchList (page = 1, q = '') {
        const { $api } = useNuxtApp()
        const store = usePostStore()

        const cache = store.list[page]?.[q]
        if (cache?.data) return cache

        const res = await $api('/posts', { params: { page, q } })
        store.setList(page, q, res)
        return res
    }
    /* 其余保持不变 */
    async function fetchDetail (id:number) {/*...*/}
    return { fetchList, fetchDetail }
}
