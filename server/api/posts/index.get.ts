import { posts } from '~/server/data/posts'

export default defineEventHandler((event) => {
    const query = getQuery(event) as { page?: string; q?: string }
    const page = Number(query.page || 1)
    const pageSize = 6
    const keyword = query.q?.toString().toLowerCase()

    let filtered = posts
    if (keyword)
        filtered = posts.filter((p) =>
            p.title.toLowerCase().includes(keyword || '')
        )

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return { data, total, pageSize }
})
