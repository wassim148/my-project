<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { cn } from '@/shared/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'

export type NotificationItemProps = {
    message: string
    time: string
} & (
    | {
          type: 'notification'
          variant: 'danger' | 'normal' | 'success'
      }
    | {
          type: 'demande'
          avatar?: string
          username: string
      }
)

const props = defineProps<NotificationItemProps>()
const variant = {
    danger: 'bg-accent-foreground/30 dark:bg-accent',
    success: 'bg-primary/30 dark:bg-primary',
    normal: 'bg-destructive/30 dark:bg-destructive',
}
</script>

<template>
    <div class="flex flex-row pl-4 space-x-2">
        <div>
            <div v-if="props.type == 'demande'" class="rounded-md p-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Avatar class="h-8 w-8">
                                <AvatarImage
                                    :src="props.avatar ? props.avatar : 'https://api.dicebear.com/7.x/lorelei/svg'"
                                    :alt="props.username"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent side="left" :side-offset="5"> {{ props.username }} </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div v-else :class="cn('rounded-md p-1', variant[props.variant ? props.variant : 'normal'])">
                <Icon icon="ph:exclamation-mark" class="w-6 h-6"></Icon>
            </div>
        </div>
        <div class="font-normal space-y-2 font-sans text-sm !text-ellipsis whitespace-nowrap overflow-hidden">
            {{ props.message }}
            <div class="text-accent-foreground/65">{{ props.time }}</div>
        </div>
    </div>
</template>
