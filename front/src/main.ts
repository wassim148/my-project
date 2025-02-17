import { createApp } from 'vue'
import { router } from '@routers'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { axiosHelper } from './core/helpers'


function initApp(App: any) {
    // create helper
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp(App)

    // inject helper
    app.use(router)
    app.use(pinia)
    app.use(axiosHelper)


    return app
}

initApp(App).mount('#app')
