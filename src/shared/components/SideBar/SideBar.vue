<script lang="ts" setup>
import UserDropdownBtn, {
    type UserDropdownBtnProps,
} from '@/shared/components/SideBar/UserDropdownBtn/UserDropdownBtn.vue'
import NavigationBtn, { type NavigationBtnProps } from '@/shared/components/SideBar/NavigationBtn/NavigationBtn.vue'
import BrowsingUtilsTab from '@/shared/components/SideBar/BrowsingUtilsTab/BrowsingUtilsTab.vue'
import NavigationDropDownBtn, {
    type NavigationDropDownBtnProps,
} from '@/shared/components/SideBar/NavigationDropDownBtn/NavigationDropDownBtn.vue'
import { cn } from '@/shared/lib/utils'

type NavigationConfig = {
    title: string
    navigations: (({ type: 'dropdown' } & NavigationDropDownBtnProps) | ({ type: 'button' } & NavigationBtnProps))[]
}[]

export interface SideBarProps {
    userDropdownMenue: UserDropdownBtnProps
    isSidebarCollapsed: boolean
    config: NavigationConfig
}

const props = defineProps<SideBarProps>()
</script>
<template>
    <Transition name="left-sidebar">
        <div
            v-if="!props.isSidebarCollapsed"
            :class="
                cn(
                    'md:fixed z-10 flex flex-col h-full w-full max-w-56 md:px-5 px-3 py-4 space-y-8 items-start border-r font-sans font-normal ease-in-out',
                )
            "
        >
            <UserDropdownBtn :menue="props.userDropdownMenue.menue" :user="props.userDropdownMenue.user" />
            <BrowsingUtilsTab ></BrowsingUtilsTab>
            <div class="flex flex-col font-sans w-full">
                <template v-for="nav in props.config">
                    <div class="hidden md:block py-3 px-1">
                        <h2 class="text-muted-foreground">{{ nav.title }}</h2>
                    </div>
                    <nav class="flex flex-col space-y-1 w-full font-sans font-normal text-sm">
                        <template v-for="link in nav.navigations">
                            <NavigationBtn
                                v-if="link.type == 'button'"
                                :to="link.to"
                                :label="link.label"
                                :icon="link.icon"
                            ></NavigationBtn>
                            <NavigationDropDownBtn v-else :label="link.label" :links="link.links" />
                        </template>
                    </nav>
                </template>
            </div>
        </div>
    </Transition>
</template>

<style>
/* we will explain what these classes do next! */
.left-sidebar-enter-active,
.left-sidebar-leave-active {
    transition: all 0.1s ease-out;
}

.left-sidebar-enter-from,
.left-sidebar-leave-to {
    width: 0px;
    @apply -translate-x-56;
}
</style>
