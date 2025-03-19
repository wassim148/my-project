<script lang="ts" setup>
import DashboardNavigation from '@/shared/components/DashboardNavigation/DashboardNavigation.vue';
import SideBar from '@/shared/components/SideBar/SideBar.vue';
import NotificationSideBar, {
    type SideBarProps as NotificationSideBarProps,
} from '@/shared/components/NotificationSideBar/NotificationSideBar.vue';
import { DASHBOARD_SIDEBAR_LINKS } from '@constants';
import { useUserStore } from '@/core/stores/user.store';
import { useNotificationStore } from '@/core/stores/notification.store';
import { cn } from '@/shared/lib/utils';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useUserDropdownMenue from '@/core/composable/useUserdropdownMenue';
const router = useRouter();

const userStore = useUserStore();
const notificationStore = useNotificationStore();

const userDropdownMenue = useUserDropdownMenue(
  computed(() => ({
    username: userStore.$state.user?.username || 'Unknown User',
    avatar: userStore.$state.user?.profilePicture || '',
    email: userStore.$state.user?.email || 'unknown@example.com',
    role: userStore.$state.user?.role || 'Guest',
  })),
    () => {
        localStorage.removeItem('token'); 
        router.push('/sign-in'); 
    },
);

const notifications = computed<NotificationSideBarProps['notification']>(async () => {
    await notificationStore.fetchNotifications();
    return notificationStore.notifications?.map((notif) => ({
        message: notif.message,
        time: notif.timeAgo,
        variant: notif.variant,
    })) ?? [];
});
const demands = computed<NotificationSideBarProps['demands']>(() => {
    return notificationStore.demands?.map((demand) => ({
        username: demand.username,
        message: demand.message,
        time: demand.timeAgo,
    })) ?? [];
});
</script>

<template>
    <div class="relative flex h-screen bg-background">
        <SideBar
            :user-dropdown-menue="userDropdownMenue"
            :config="DASHBOARD_SIDEBAR_LINKS"
            :is-sidebar-collapsed="userStore.isLeftSidebarCollapsed"
            @logout="logout"
        />

        <main
            :class="
                cn(
                    'relative flex-1 transition-all duration-300 ease-in-out',
                    !userStore.isRightSidebarCollapsed && 'mr-[17.5rem]',
                    !userStore.isLeftSidebarCollapsed && 'md:pl-56', 
                )
            "
        >
            <DashboardNavigation
                v-model:is-right-sidebar-collapsed="userStore.isRightSidebarCollapsed"
                v-model:is-left-sidebar-collapsed="userStore.isLeftSidebarCollapsed"
            />

            <RouterView />
        </main>

        <NotificationSideBar
            :notification="notifications"
            :demands="demands"
            :is-sidebar-collapsed="userStore.isRightSidebarCollapsed"
        />
    </div>
</template>

