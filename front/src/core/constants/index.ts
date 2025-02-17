export enum env {
    BACKEND_BASE_URL = import.meta.env.VITE_BASE_API_URL,
    TOKEN_KEY = 'user-token',
    VERSION = '/api/v1'
}

export {  ROUTES } from './routes.const'
export {  DASHBOARD_ROUTES } from './dashboardRoutes.const'
export { default as DASHBOARD_SIDEBAR_LINKS } from './dashboardSidebarLinks.const'
