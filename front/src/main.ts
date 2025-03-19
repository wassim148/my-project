import { createApp } from 'vue'
import { router } from '@routers'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { axiosHelper } from './core/helpers'
import { parse, stringify } from 'zipson/lib'
import { env } from './core/constants'
import axios from 'axios'
// import 'v-calendar/dist/style.css';


function initApp(App: any) {
    const pinia = createPinia()
    pinia.use(createPersistedState({
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    }),
)

window.$axios = axios.create({
    baseURL: env.BACKEND_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

    const app = createApp(App)

    app.use(router)
    app.use(pinia)
    app.use(axiosHelper)


    return app
}

initApp(App).mount('#app')
