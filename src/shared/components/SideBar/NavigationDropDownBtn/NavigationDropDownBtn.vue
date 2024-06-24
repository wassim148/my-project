<script lang="ts" setup>
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible'
import { ref } from 'vue'
import Button from '@/shared/components/ui/button/Button.vue'
import { cn } from '@/shared/lib/utils'
import { Icon } from '@iconify/vue'
import NavigationBtn from '@/shared/components/SideBar/NavigationBtn/NavigationBtn.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'

export interface NavigationDropDownBtnProps {
    label: string
    icon?: string
    links: {
        label: string
        to: string
        icon?: string
    }[]
}
const props = defineProps<NavigationDropDownBtnProps>()
const isOpen = ref(false)
</script>

<template>
    <Collapsible v-model:open="isOpen">
        <CollapsibleTrigger class="w-full">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            variant="ghost"
                            :class="
                                cn(
                                    'relative flex items-center md:justify-start justify-center w-full px-0 md:space-x-2',
                                )
                            "
                        >
                            <div class="w-6">
                                <span v-if="isOpen" class="absolute top-1 left-0 h-8 w-2 rounded-sm bg-black"> </span>
                                <Icon
                                    icon="ph:caret-right"
                                    v-if="!isOpen"
                                    class="hidden md:block w-4 h-4 text-accent-foreground ml-1"
                                >
                                </Icon>
                                <Icon
                                    icon="ph:caret-down"
                                    v-if="isOpen"
                                    class="hidden md:block w-4 h-4 text-accent-foreground ml-3"
                                >
                                </Icon>
                            </div>
                            <Icon :icon="props.icon ? props.icon : 'ph:diamonds-four-duotone'" class="w-6 h-6"> </Icon>
                            <span class="hidden md:block">{{ props.label }}</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="5">
                        {{ props.label }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </CollapsibleTrigger>
        <CollapsibleContent class="md:pl-6 space-y-1">
            <NavigationBtn
                v-for="link in props.links"
                :icon="link.icon ? link.icon : 'ph:info-fill'"
                :to="link.to"
                :label="link.label"
            ></NavigationBtn>
        </CollapsibleContent>
    </Collapsible>
</template>
