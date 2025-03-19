<script lang="ts" setup>
import UserDropdownBtn from '@/shared/components/SideBar/UserDropdownBtn/UserDropdownBtn.vue'
import NavigationBtn from '@/shared/components/SideBar/NavigationBtn/NavigationBtn.vue'
import BrowsingUtilsTab from '@/shared/components/SideBar/BrowsingUtilsTab/BrowsingUtilsTab.vue'
import NavigationDropDownBtn from '@/shared/components/SideBar/NavigationDropDownBtn/NavigationDropDownBtn.vue'
import { defineProps } from 'vue'

export interface NavigationConfig {
    title: string;
    navigations: (
        | { type: 'dropdown'; label: string; links: { to: string; label: string }[] }
        | { type: 'button'; to: string; label: string; icon?: string }
    )[];
}

export interface SideBarProps {
    isSidebarCollapsed: boolean;
    userDropdownMenue: {
        menue: { label: string; action: () => void }[];
        user: { username: string; avatar: string };
    };
    config: NavigationConfig[];
}

const props = defineProps<SideBarProps>();
</script>

<template>
    <Transition name="left-sidebar">
        <div
            v-if="!props.isSidebarCollapsed"
            class="fixed z-10 left-0 flex flex-col space-y-6 p-5 w-[13.5rem] h-full border-r bg-white shadow-lg"
        >
            <!-- User Dropdown -->
            <UserDropdownBtn 
                :menue="props.userDropdownMenue.menue" 
                :user="props.userDropdownMenue.user" 
            />

            <!-- Browsing Utilities -->
            <BrowsingUtilsTab />

            <!-- Navigation Section -->
            <div class="flex flex-col w-full">
                <template v-for="(nav, navIndex) in props.config" :key="navIndex">
                    <div class="hidden md:block py-3 px-1">
                        <h2 class="text-muted-foreground">{{ nav.title }}</h2>
                    </div>
                    <nav class="flex flex-col space-y-1 w-full text-sm">
                        <template v-for="(link, linkIndex) in nav.navigations" :key="linkIndex">
                            <NavigationBtn
                                v-if="link.type === 'button'"
                                :to="link.to"
                                :label="link.label"
                                :icon="link.icon"
                            />
                            <NavigationDropDownBtn 
                                v-else 
                                :label="link.label" 
                                :links="link.links" 
                            />
                        </template>
                    </nav>
                </template>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* Sidebar transition animations */
.left-sidebar-enter-active,
.left-sidebar-leave-active {
    transition: transform 0.3s ease-out;
}

.left-sidebar-enter-from,
.left-sidebar-leave-to {
    transform: translateX(-100%);
}
</style>
