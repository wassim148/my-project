<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { Icon } from '@iconify/vue'

export type DisplayCardProps = {
    title: string
    content: {
        value: number
        formatter?: (val: number) => string
    }
} & (
    | {
          state: number
          formatter?: (val: number) => string
          trend: 'up' | 'down'
      }
    | {}
)
const props = defineProps<DisplayCardProps>()
</script>

<template>
    <Card class="md:w-64 md:h-36 w-60 h-32 font-sans shadow-none bg-secondary">
        <CardHeader>
            <CardTitle class="font-sans tracking-wide font-semibold text-sm md:text-base">{{ props.title }}</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-row items-center justify-between">
                <span class="font-['Rubik'] tracking-wide md:font-medium font-normal text-2xl md:text-3xl">
                    {{
                        props.content.formatter
                            ? props.content.formatter(props.content.value)
                            : new Intl.NumberFormat().format(props.content.value)
                    }}
                </span>
                <span
                    v-if="'trend' in props && props.trend"
                    :class="
                        cn(
                            'flex space-x-2 font-[\'Rubik\'] tracking-wide font-light md:text-sm text-xs persenta',
                            props.trend == 'up' ? 'text-green-400' : 'text-rose-600',
                        )
                    "
                >
                    <span>
                        {{
                            props.formatter
                                ? props.formatter(props.state)
                                : `${props.trend == 'up' ? '+' : '-'}${props.state.toLocaleString()}%`
                        }}
                    </span>
                    <Icon :icon="props.trend == 'up' ? 'ph:trend-up-duotone' : 'ph:trend-down-duotone'"></Icon>
                </span>
            </div>
        </CardContent>
    </Card>
</template>
