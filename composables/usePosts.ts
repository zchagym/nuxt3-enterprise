/* composables/usePosts.ts */
export function usePosts () {
    /* ← 这里不能写任何 useNuxtApp/useRoute，先定义空壳函数 */

    async function fetchList (page = 1, q = '') {
        const { $api } = useNuxtApp()       // ★ 只有调用 fetchList 才会执行
        const store = usePostStore()

        if (store.list[page]?.data) return store.list[page]
        const res = await $api('/posts', { params: { page, q } })
        store.setList(page, res)
        return res
    }

    async function fetchDetail (id: number) {
        const { $api } = useNuxtApp()       // ★ 同理
        const store = usePostStore()

        if (store.detail[id]) return store.detail[id]
        const { post, related } = await $api(`/posts/${id}`)
        store.setDetail(id, { post, related })
        return { post, related }
    }

    return { fetchList, fetchDetail }
}
