import { type SideBarProps } from '@/shared/components/SideBar/SideBar.vue'

const sidebarNavigation: SideBarProps['config'] = [
    {
        title: 'Dashboards',
        navigations: [
            {
                type: 'button',
                label: 'demands ',
                to: 'DemandesDeConge',
                icon: 'ph:file-text-bold',
            },
            {
                type: 'button',
                label: 'Tableau',
                to: 'TableaudeSuivi',
                icon: 'ph:table-duotone',
            },
            {
                type: 'button',
                label: 'Calendrier',
                to: 'CalendrierInteractif',
                icon: 'ph:calendar-duotone',
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
                icon: 'ph:admin-duotone'
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
