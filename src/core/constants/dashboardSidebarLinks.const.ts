import { type SideBarProps } from '@/shared/components/SideBar/SideBar.vue'

const sidebarNavigation: SideBarProps['config'] = [
    {
        title: 'Dashboards',
        navigations: [
            {
                type: 'button',
                label: 'Default',
                icon: 'ph:chart-pie-slice-duotone',
                to: 'main',
            },
            // {
            //     type: 'button',
            //     label: 'Stocks',
            //     to: 'Stockes',
            //     icon: 'ph:dropbox-logo-fill',
            //     // links: [
            //     //     {
            //     //         label: 'Pices',
            //     //         to: 'home',
            //     //         icon: 'ph:puzzle-piece',
            //     //     },
            //     //     {
            //     //         label: 'Machines',
            //     //         to: 'main',
            //     //         icon: 'ph:crane',
            //     //     },
            //     //     {
            //     //         label: 'Order',
            //     //         to: 'home',
            //     //         icon: 'ph:shopping-cart',
            //     //     },
            //     // ],
            // },
            {
                type: 'button',
                label: 'demands de Conge',
                to: 'DemandesDeConge',
                icon: 'ph:briefcase-duotone',
            },
            {
                type: 'button',
                label: 'Tableau de Suivi',
                to: 'TableaudeSuivi',
                icon: 'ph:users-three-duotone',
            },
            {
                type: 'button',
                label: 'Calendrier Interactif',
                to: 'CalendrierInteractif',
                icon: 'ph:users-three-duotone',
            },
            {
                type: 'button',
                label: 'Settings',
                to: 'Settings',
                icon: 'ph:gear-duotone',
            },
            {
                type: 'button',
                label: 'Admin',
                to: 'AdminDashboard',
                icon: 'ph:admin'
            },
            {
                type: 'button',
                label: 'Employe',
                to: 'Employeemanagemt',
                icon: 'ph:user'
            }
        ],
    },
]
export default sidebarNavigation
