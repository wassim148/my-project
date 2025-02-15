<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Icon } from '@iconify/vue'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from '@/shared/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'

type DropdownBtn = {
    label: string
    icon?: string
} & (
    | {
          action: 'link'
          to: string
      }
    | {
          action: 'onClick'
          event: () => void
      }
)

export interface UserDropdownBtnProps {
    user: {
        avatar?: string
        fullName: string
    }
    menue: {
        groupName?: string
        items: (
            | ({
                  type: 'menue-item'
              } & DropdownBtn)
            | {
                  type: 'sub-menue-item'
                  label: string
                  icon?: string
                  subItems: DropdownBtn[]
              }
        )[]
    }[]
}
const props = defineProps<UserDropdownBtnProps>()
</script>

<template>
    <DropdownMenu class="text-primary">
        <DropdownMenuTrigger as-child>
            <Button
                variant="ghost"
                class="flex w-full flex-row space-x-2 justify-center md:justify-start items-center hover:bg-transparent px-2"
            >
                <Avatar class="h-8 w-8">
                    <AvatarImage
                        :src="props.user.avatar ? props.user.avatar : 'https://api.dicebear.com/7.x/lorelei/svg'"
                        :alt="props.user.fullName"
                    />
                    <AvatarFallback> DS </AvatarFallback>
                </Avatar>
                <span class="hidden md:block font-sans font-normal text-sm"> {{ props.user.fullName }} </span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <template v-for="(item, index) in props.menue">
                <DropdownMenuLabel v-if="item.groupName"> {{ item.groupName }}</DropdownMenuLabel>
                <DropdownMenuSeparator v-if="item.groupName" />
                <DropdownMenuGroup>
                    <template v-for="link in item.items">
                        <template v-if="link.type == 'menue-item'">
                            <DropdownMenuItem v-if="link.action == 'link'">
                                <RouterLink class="flex" :to="link.to" as-child>
                                    <Icon class="mr-2 h-4 w-4" v-if="link.icon" :icon="link.icon"></Icon>
                                    <span>{{ link.label }}</span>
                                </RouterLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem class="flex" v-if="link.action == 'onClick'" @click="link.event">
                                <Icon class="mr-2 h-4 w-4" v-if="link.icon" :icon="link.icon"></Icon>
                                <span>{{ link.label }}</span>
                            </DropdownMenuItem>
                        </template>
                        <template v-else>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Icon v-if="link.icon" :icon="link.icon"></Icon>
                                    <span>{{ link.label }}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <template v-for="subItem in link.subItems">
                                            <DropdownMenuItem v-if="subItem.action == 'link'" as-child>
                                                <RouterLink :to="subItem.to" class="flex">
                                                    <Icon
                                                        class="mr-2 h-4 w-4"
                                                        v-if="subItem.icon"
                                                        :icon="subItem.icon"
                                                    ></Icon>

                                                    <span>{{ subItem.label }}</span>
                                                </RouterLink>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem v-if="subItem.action == 'onClick'" @click="subItem.event">
                                                <Icon
                                                    class="mr-2 h-4 w-4"
                                                    v-if="subItem.icon"
                                                    :icon="subItem.icon"
                                                ></Icon>
                                                <span>{{ subItem.label }}</span>
                                            </DropdownMenuItem>
                                        </template>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </template>
                    </template>
                </DropdownMenuGroup>
                <DropdownMenuSeparator v-if="index != props.menue.length - 1" />
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
