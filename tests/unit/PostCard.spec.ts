import { render } from '@testing-library/vue'
import PostCard from '@/components/PostCard.vue'

it('renders title & excerpt', () => {
    const { getByText } = render(PostCard, {
        props: { post: { id: 1, title: 'Hello', excerpt: 'Exc', cover: '' } }
    })
    getByText('Hello')
    getByText('Exc')
})
