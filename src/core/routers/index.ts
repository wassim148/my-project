import { createMemoryHistory, createRouter } from 'vue-router'
import { ROUTES, DASHBOARD_ROUTES } from '@constants'
export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        // {
        //     ...ROUTES.HOME,
        //     redirect: ROUTES.SIGN_IN.path,
        //     component: () => import('@pages/LandingPages/Home/Home.vue'),
        //     children: [
        //         {
        //             ...ROUTES.SIGN_IN,
        //             component: () => import('@pages/LandingPages/Home/Login/Login.vue'),
        //             beforeEnter: () => {
        //                 return true
        //             },
        //         },
        //         {
        //             ...ROUTES.SIGN_UP,
        //             component: () => import('@pages/LandingPages/Home/Signup/Signup.vue'),
        //         },
        //     ],
        // },
        {
            ...ROUTES.MAIN,
            component: () => import('@pages/Dashboard/MainDashboard.vue'),
            children: [
                {
                    ...DASHBOARD_ROUTES.STOCKS,
                    component: () => import('@pages/Dashboard/Stocks/Stocks.vue'),
                },
            ],
        },
    ],
})
