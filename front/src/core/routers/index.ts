import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES, DASHBOARD_ROUTES } from '@constants';
import authGuard from '@/core/guards/auth.guard';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            ...ROUTES.HOME,
            component: () => import('@/pages/Dashboard/MainDashboard.vue'),
            beforeEnter: authGuard,
        },
        {
            ...ROUTES.AUTH,
            component: () => import('@pages/LandingPages/Home/Home.vue'),
            redirect: `${ROUTES.AUTH.path}/${ROUTES.SIGN_IN.path}`,
            beforeEnter: authGuard,
            children: [
                { ...ROUTES.SIGN_UP, component: () => import('@pages/LandingPages/Home/Signup/Signup.vue') },
                { ...ROUTES.SIGN_IN, component: () => import('@pages/LandingPages/Home/Login/Login.vue') },
            ],
        },
        {
            ...ROUTES.MAIN,
            component: () => import('@pages/Dashboard/MainDashboard.vue'),
            beforeEnter: authGuard,
            children: [
                { ...DASHBOARD_ROUTES.DEMANDES_CONGE, beforeEnter: authGuard, component: () => import('@pages/Dashboard/Conge/DemendeConge.vue') },
                { ...DASHBOARD_ROUTES.PROFILE, component: () => import('@pages/Dashboard/Profile/Profile.vue') },
                { ...DASHBOARD_ROUTES.TABLEAU_SUIVI, component: () => import('@/pages/Dashboard/Admin/TableauSuivi.vue') },
                { ...DASHBOARD_ROUTES.CALENDRIER_INTERACTIF, component: () => import('@pages/Dashboard/Conge/CalendrierInteractif.vue') },
                { ...DASHBOARD_ROUTES.SETTINGS, component: () => import('@pages/Dashboard/Settings/Settings.vue') },
                { ...DASHBOARD_ROUTES.ADMIN_DASHBOARD, component: () => import('@/pages/Dashboard/Admin/AdminDashboard.vue') },
                { ...DASHBOARD_ROUTES.HISTORY, component: () => import('@/pages/Dashboard/Conge/History.vue') },
                { ...DASHBOARD_ROUTES.EMPLOYE, component: () => import('@/pages/Dashboard/Admin/Employe/EmployeeList.vue') },
                {...DASHBOARD_ROUTES.HESTORY, component: () => import('@/pages/Dashboard/Admin/History.vue')},
            ],
        },
    ],
});


// import { createMemoryHistory, createRouter } from 'vue-router'
// import { ROUTES, DASHBOARD_ROUTES } from '@constants'
// import authGuard from '@/core/guards/auth.guard';

// export const router = createRouter({
//     history: createMemoryHistory(),
//     routes: [
//         {
//             ...ROUTES.HOME,
//             component: () => import('@/pages/Dashboard/MainDashboard.vue'),
//             beforeEnter: authGuard,
//         },
//         {
//             ...ROUTES.AUTH,
//             component: () => import('@pages/LandingPages/Home/Home.vue'),
//             redirect: `${ROUTES.AUTH.path}/${ROUTES.SIGN_IN.path}`,
//             beforeEnter: authGuard,
//             children: [
//                 {
//                     ...ROUTES.SIGN_UP,
//                     component: () => import('@pages/LandingPages/Home/Signup/Signup.vue'),
//                 },
//                 {
//                     ...ROUTES.SIGN_IN,
//                     component: () => import('@pages/LandingPages/Home/Login/Login.vue'),
//                 },
//             ],
//         },
//         {
//             ...ROUTES.MAIN,
//             component: () => import('@pages/Dashboard/MainDashboard.vue'),
//             beforeEnter: authGuard,
//             children: [
//                 {
//                     ...DASHBOARD_ROUTES.DEMANDES_CONGE,
//                     beforeEnter: authGuard,
//                     component: () => import('@pages/Dashboard/Conge/DemendeConge.vue'),
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.PROFILE,
//                     component: () => import('@pages/Dashboard/Profile/Profile.vue'),
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.TABLEAU_SUIVI,
//                     component: () => import('@/pages/Dashboard/Admin/TableauSuivi.vue'),
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.CALENDRIER_INTERACTIF,
//                     component: () => import('@pages/Dashboard/Conge/CalendrierInteractif.vue'),
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.SETTINGS,
//                     component: () => import('@pages/Dashboard/Settings/Settings.vue'),
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.ADMIN_DASHBOARD,
//                     component: () => import('@/pages/Dashboard/Admin/AdminDashboard.vue')
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.HESTORY,
//                     component: () => import('@/pages/Dashboard/Admin/History.vue')
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.HISTORY,
//                     component: () => import('@/pages/Dashboard/Conge/History.vue')
//                 },
//                 {
//                     ...DASHBOARD_ROUTES.EMPLOYE,
//                     component: () => import('@/pages/Dashboard/Admin/Employe/EmployeeList.vue')
//                 }
//             ],
//         },
//     ],
// })

