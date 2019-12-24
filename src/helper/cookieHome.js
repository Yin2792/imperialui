
const HOME = "home"

export const writeCookie = (cookie, data) => {
    return cookie.set(HOME, data)
}
export const readCookie = (cookie) => {
    return cookie.get(HOME)
}

export const deleteCookie = (cookie) => {
    return cookie.remove(HOME)
}