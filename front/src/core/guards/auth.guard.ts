import { useCookies } from 'vue3-cookies'
import { ROUTES } from '@constants'

const AUTH_ROUTES = [
    ROUTES.LOGIN.name,
    ROUTES.CONTACT_US.name,
    ROUTES.RESET_PASSWORD.name,
    ROUTES.UPDATE_PASSWORD.name,
]

export default async (to: any, from: any, next: any) => {
    const { cookies } = useCookies()
    const authentificated = !!cookies.get('user-token')

    if (!AUTH_ROUTES.includes(to.name) && !authentificated) {
        next({ path: ROUTES.LOGIN.path })
        return
    }

    if (AUTH_ROUTES.includes(to.name) && authentificated) {
        next({ path: ROUTES.MAIN.path })
        return
    }

    if (to.name == ROUTES.UPDATE_PASSWORD.name && !to.query.code) {
        next({ path: ROUTES.LOGIN.path })
        return
    }
    next()
}
