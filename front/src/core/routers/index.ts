import { createMemoryHistory, createRouter } from 'vue-router'
import { ROUTES, DASHBOARD_ROUTES } from '@constants'


export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        // {
        //     path: '/Settings',
        //     name: 'Settings',
        //     component: () => import('@/pages/Dashboard/Settings/Settings.vue')
        // },
        // {
        //     ...ROUTES.HOME,
        //     redirect: ROUTES.SIGN_IN.path,
        //     component: () => import('@pages/LandingPages/Home/Home.vue'),
        //     children: [
        //         {
        //             ...ROUTES.SIGN_UP,
        //             component: () => import('@pages/LandingPages/Home/Signup/Signup.vue'),
        //         },
        //         {
        //             ...ROUTES.SIGN_IN,
        //             component: () => import('@pages/LandingPages/Home/Login/Login.vue'),
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
                {
                  ...DASHBOARD_ROUTES.DEMANDES_CONGE,
                  component: () => import('@pages/Dashboard/Conge/DemendeConge.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.PROFILE,
                    component: () => import('@pages/Dashboard/Profile/Profile.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.TABLEAU_SUIVI,
                    component: () => import('@pages/Dashboard/Conge/TableauSuivi.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.CALENDRIER_INTERACTIF,
                    component: () => import('@pages/Dashboard/Conge/CalendrierInteractif.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.SETTINGS,
                    component: () => import('@pages/Dashboard/Settings/Settings.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.ADMIN_DASHBOARD,
                    component: () => import('@/pages/Dashboard/Admin/AdminDashboard.vue')
                },
                {
                    ...DASHBOARD_ROUTES.EMPLOYEE_MANAGEMENT,
                    component: () => import('@/pages/Dashboard/Admin/EmployeeManagement.vue')
                }
            ],
            // beforeEnter: routeGuard,
        },
    ],
})

