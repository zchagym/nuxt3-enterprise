import { sign } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody<{ username:string; password:string }>(event)

    if (username !== 'demo' || password !== 'demo') {
        setResponseStatus(event, 401)
        return { message: 'Invalid credential' }
    }

    const user = { id: 1, username }
    const token = sign({ uid: user.id, exp: Date.now() + 1000 * 60 * 30 }) // 30min

    const config = useRuntimeConfig(event)
    setCookie(event, config.public.authCookieName, token, {
        httpOnly: true,
        maxAge: 60 * 30,
        sameSite: 'lax',
        path: '/'
    })

    return { user }
})
