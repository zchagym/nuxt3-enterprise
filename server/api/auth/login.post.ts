export default defineEventHandler(async (event) => {
    const body = await readBody<{ username: string; password: string }>(event)

    // demo 纯前端验证，生产请验证数据库
    if (body.username === 'demo' && body.password === 'demo') {
        return {
            token: 'fake-jwt-token-123456',
            user: { id: 1, username: 'demo' }
        }
    }

    setResponseStatus(event, 401)
    return { message: 'Invalid credentials' }
})
