import type { AxiosInstance } from 'axios'

declare global {
    interface Window {
        $axios: AxiosInstance
    }
    interface Navigator {
        userAgent: string
    }

    var navigator: Navigator
}
export {}
