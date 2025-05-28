import { posts } from '~/server/data/posts'

export default defineEventHandler((event) => {
    const id = Number(event.context.params!.id)
    const post = posts.find((p) => p.id === id)
    if (!post) {
        setResponseStatus(event, 404)
        return { message: 'Not found' }
    }
    // 推荐 3 篇其他文章
    const related = posts
        .filter((p) => p.id !== id)
        .slice(0, 3)
        .map(({ id, title }) => ({ id, title }))
    return { post, related }
})
