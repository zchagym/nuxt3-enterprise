import dayjs from 'dayjs'

interface Post {
    id: number
    title: string
    excerpt: string
    content: string
    author: string
    createdAt: string
}

export const posts: Post[] = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    title: `Demo article #${i + 1}`,
    excerpt: `This is the excerpt of article #${i + 1}`,
    content: `## Article ${i + 1}\n\nHere is **markdown** content for post ${
        i + 1
    }.\n\nLorem ipsum dolor sit amet…`,
    author: 'John Doe',
    createdAt: dayjs()
        .subtract(i, 'day')
        .format('YYYY-MM-DD'),
}))
