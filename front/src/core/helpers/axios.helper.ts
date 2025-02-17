import axios from 'axios'
import type { App } from 'vue'
import useAxios from '../composable/useAxios'
import { env } from '../constants'

const _axios = axios.create({
    baseURL: env?.BACKEND_BASE_URL?.toString(),
    headers: {},
})

export default {
    install: (app: App) => {
        useAxios(_axios)
        app.config.globalProperties.$axios = _axios
        window.$axios = app.config.globalProperties.$axios
    },
}
