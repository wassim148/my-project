import { type SideBarProps } from '@/shared/components/SideBar/SideBar.vue'

const sidebarNavigation: SideBarProps['config'] = [
    {
        title: 'Dashboards',
        navigations: [
            {
                type: 'button',
                label: 'demands ',
                to: 'Demandes',
                icon: 'ph:file-text-bold',
            },
            {
                type: 'button',
                label: 'History',
                to: 'HistoryE',
                icon: 'ph:history-duotone'
            },
            {
                type: 'button',
                label: 'Calendrier',
                to: 'Calendrier',
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
                label: 'Tableau',
                to: 'Tableau',
                icon: 'ph:table-duotone',
            },
            {
                type: 'button',
                label: 'Admin',
                to: 'AdminDashboard',
                icon: 'ph:admin-duotone'
            },
            {
                type: 'button',
                label: 'History',
                to: 'History',
                icon: 'ph:history-duotone'
            },
            {
                type: 'button',
                label: 'Employe',
                to: 'Employe',
                icon: 'ph:user'
            },
        ],
    },
]
export default sidebarNavigation
