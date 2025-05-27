export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event)
    deleteCookie(event, config.public.authCookieName)
    return { ok: true }
})
