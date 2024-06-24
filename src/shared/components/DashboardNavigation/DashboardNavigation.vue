<script lang="ts" setup>
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@components/ui/command'
import StarButton from '@components/Buttons/StarButton.vue'
import ToggleDarkModeButton from '@components/Buttons/ToggleDarkModeButton.vue'

const isLeftSidebarCollapsed = defineModel('isLeftSidebarCollapsed', { required: true, type: Boolean })
const isRightSidebarCollapsed = defineModel('isRightSidebarCollapsed', { required: true, type: Boolean })
</script>

<template>
    <div class="flex h-20 px-7 py-5 border-b items-center space-x-4">
        <div class="flex">
            <Button variant="ghost" size="icon" @click="() => (isLeftSidebarCollapsed = !isLeftSidebarCollapsed)">
                <Icon icon="ph:sidebar"></Icon>
            </Button>
            <StarButton></StarButton>
        </div>
        <div class="flex flex-grow items-center">
            <Breadcrumb class="hidden md:flex item-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink> Dashboards </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Default</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div class="flex flex-row justify-center space-x-4">
            <Command class="bg-accent rounded-lg border justify-center">
                <Popover>
                    <PopoverTrigger>
                        <CommandInput placeholder="search" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem value="Calendar">
                                    <span>Calendar</span>
                                </CommandItem>
                                <CommandItem value="Search Emoji">
                                    <span>Search Emoji</span>
                                </CommandItem>
                                <CommandItem value="Calculator">
                                    <span>Calculator</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem value="Profile">
                                    <span>Profile</span>
                                    <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                                <CommandItem value="Billing">
                                    <span>Billing</span>
                                    <CommandShortcut>⌘B</CommandShortcut>
                                </CommandItem>
                                <CommandItem value="Settings">
                                    <span>Settings</span>
                                    <CommandShortcut>⌘S</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </PopoverContent>
                </Popover>
            </Command>
            <div class="flex">
                <ToggleDarkModeButton />
                <Button
                    variant="ghost"
                    size="icon"
                    class="rotate-180"
                    @click="() => (isRightSidebarCollapsed = !isRightSidebarCollapsed)"
                >
                    <Icon icon="ph:sidebar"></Icon>
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon icon="ph:bell-duotone"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
