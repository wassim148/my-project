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
            {
                type: 'button',
                label: 'Stocks',
                to: 'Stockes',
                icon: 'ph:dropbox-logo-fill',
                // links: [
                //     {
                //         label: 'Pices',
                //         to: 'home',
                //         icon: 'ph:puzzle-piece',
                //     },
                //     {
                //         label: 'Machines',
                //         to: 'main',
                //         icon: 'ph:crane',
                //     },
                //     {
                //         label: 'Order',
                //         to: 'home',
                //         icon: 'ph:shopping-cart',
                //     },
                // ],
            },
        ],
    },
]
export default sidebarNavigation
