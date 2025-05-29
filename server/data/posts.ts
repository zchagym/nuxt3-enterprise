import dayjs from 'dayjs'

export const posts = Array.from({ length: 30 }).map((_, i) => ({
    id       : i + 1,
    title    : `Demo article #${i + 1}`,
    excerpt  : `This is the excerpt of article #${i + 1}`,
    content  : `## Article ${i + 1}\n\nMarkdown content ...`,
    cover    : `https://source.unsplash.com/800x600?sig=${i}&nature`,
    author   : 'John Doe',
    createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
}))
