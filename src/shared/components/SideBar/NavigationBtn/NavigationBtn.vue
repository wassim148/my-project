<script lang="ts" setup>
import Button from '@/shared/components/ui/button/Button.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { Icon } from '@iconify/vue'
import { cn } from '@/shared/lib/utils'
import { useRoute } from 'vue-router'

export interface NavigationBtnProps {
    to: string
    label: string
    icon?: string
}
const props = defineProps<NavigationBtnProps>()

// Curent route info
const route = useRoute()

const isRoute = (toRoute: string) => {
    return route.name == toRoute
}
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <Button
                    variant="ghost"
                    :class="cn('relative md:justify-start justify-center w-full', isRoute(props.to) && 'bg-accent')"
                >
                    <RouterLink :to="{ name: props.to }" as-child class=" w-full h-full flex items-center md:space-x-2">
                        <div class="md:w-6 w-2">
                            <span v-if="isRoute(props.to)" class="absolute top-1 left-0 h-8 w-2 rounded-sm bg-accent-foreground"> </span>
                        </div>
                        <Icon v-if="props.icon" :icon="props.icon" class="w-6 h-6" />
                        <span class="hidden md:block"> {{ props.label }} </span>
                    </RouterLink>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" :side-offset="5"> {{ props.label }} </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
