
import { type UserDropdownBtnProps } from '@/shared/components/SideBar/UserDropdownBtn/UserDropdownBtn.vue'

const useUserDropdownMenue = (user: UserDropdownBtnProps['user'], logout: () => void): UserDropdownBtnProps => ({
    user,
    menue: [
        {
            groupName: `Welcome ${user.fullName}`,
            items: [
                {
                    type: 'menue-item',
                    action: 'link',
                    label: 'Profile',
                    icon: 'ph:user-duotone',
                    to: '/profile',
                },
                {
                    type: 'menue-item',
                    action: 'link',
                    label: 'Users',
                    icon: 'ph:users-three-duotone',
                    to: '/',
                },
                {
                    type: 'menue-item',
                    action: 'link',
                    label: 'Payment',
                    icon: 'ph:money-wavy-duotone',
                    to: '/',
                },
                {
                    type: 'menue-item',
                    action: 'link',
                    label: 'Settings',
                    icon: 'ph:gears-duotone',
                    to: '/Settings',
                },
            ],
        },
        {
            items: [
                {
                    type: 'menue-item',
                    label: 'Logout',
                    action: 'onClick',
                    event: logout,
                },
            ],
        },
    ],
})

export default useUserDropdownMenue
