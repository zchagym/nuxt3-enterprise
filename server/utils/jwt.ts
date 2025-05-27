// 纯前端 Base64 Mock，生产请换成 jose 或 jsonwebtoken
export function sign (payload: any) {
    return Buffer.from(JSON.stringify(payload)).toString('base64')
}
export function verify (token?: string) {
    if (!token) throw new Error('no token')
    const json = Buffer.from(token, 'base64').toString()
    return JSON.parse(json)
}
