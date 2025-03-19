<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { defineProps } from 'vue';

export type NotificationItemProps = {
  message: string;
  time: string;
} & (
  | { type: 'notification'; variant: 'danger' | 'normal' | 'success' }
  | { type: 'demande'; avatar?: string; username: string }
);

const props = defineProps<NotificationItemProps>();
const variantClasses = {
  danger: 'bg-red-500/30 dark:bg-red-700',
  success: 'bg-green-500/30 dark:bg-green-700',
  normal: 'bg-gray-500/30 dark:bg-gray-700'
};
</script>

<template>
  <div class="flex flex-row pl-4 space-x-2">
    <div class="shrink-0">
      <div v-if="props.type === 'demande'" class="rounded-md p-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Avatar class="h-8 w-8">
                <AvatarImage
                  :src="props.avatar || 'https://api.dicebear.com/7.x/lorelei/svg'"
                  :alt="props.username"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="left" :side-offset="5">{{ props.username }}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div v-else :class="cn('rounded-md p-1', variantClasses[props.variant || 'normal'])">
        <Icon icon="ph:exclamation-mark" class="w-6 h-6"></Icon>
      </div>
    </div>
    <div class="flex flex-col space-y-2 font-sans text-sm truncate">
      {{ props.message }}
      <div class="text-gray-400">{{ props.time }}</div>
    </div>
  </div>
</template>
