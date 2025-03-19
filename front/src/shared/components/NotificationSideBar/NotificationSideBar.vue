<script lang="ts" setup>
import NotificationItem from '@/shared/components/NotificationSideBar/NotificationItem/NotificationItem.vue';
import { defineProps } from 'vue';

export interface SideBarProps {
    isSidebarCollapsed: boolean;
    notifications: Notification[];
    demands: Demand[];
}

export interface Notification {
    id: number;
    message: string;
    time: string;
    variant: 'danger' | 'normal' | 'success';
}

export interface Demand {
    id: number;
    message: string;
    time: string;
    avatar?: string;
    username: string;
}

const props = defineProps<SideBarProps>();
</script>

<template>
    <Transition name="right-sidebar">
        <div
            v-if="!props.isSidebarCollapsed"
            class="fixed z-10 right-0 flex flex-col space-y-6 p-5 w-[17.5rem] h-full border-l bg-white shadow-lg"
        >
            <!-- Notifications Section -->
            <h1 class="font-bold font-sans text-sm">Notifications</h1>
            <NotificationItem
                v-for="item in props.notifications"
                :key="item.id"
                type="notification"
                :message="item.message"
                :time="item.time"
                :variant="item.variant"
            />

            <!-- Demands Section -->
            <h1 class="font-bold font-sans text-sm">Demands</h1>
            <NotificationItem
                v-for="item in props.demands"
                :key="item.id"
                type="demande"
                :message="item.message"
                :time="item.time"
                :username="item.username"
                :avatar="item.avatar"
            />
        </div>
    </Transition>
</template>

<style scoped>
/* Smooth transition for sidebar appearance */
.right-sidebar-enter-active,
.right-sidebar-leave-active {
    transition: transform 0.3s ease-out;
}

.right-sidebar-enter-from,
.right-sidebar-leave-to {
    transform: translateX(100%);
}
</style>
