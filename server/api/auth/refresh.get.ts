import { verify, sign } from '~/server/utils/jwt'

export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event)
    const old = getCookie(event, config.public.authCookieName)

    try {
        const decoded = verify(old)
        // 若过期 <5min 自动续期
        const fiveMin = 1000 * 60 * 5
        if (decoded.exp - Date.now() < fiveMin) {
            const newToken = sign({ uid: decoded.uid, exp: Date.now() + 1000 * 60 * 30 })
            setCookie(event, config.public.authCookieName, newToken, {
                httpOnly: true, maxAge: 60 * 30, sameSite: 'lax', path: '/'
            })
        }
        return { user: { id: decoded.uid, username: 'demo' } }
    } catch {
        setResponseStatus(event, 401)
        return { message: 'invalid' }
    }
})
