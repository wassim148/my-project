<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { Icon } from '@iconify/vue'
import { cn } from '@lib/utils'
import { Button } from '@components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import type { Machine } from './columns'

interface DataTableColumnHeaderProps {
    column: Column<Machine, any>
    title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
                    <span>{{ title }}</span>
                    <Icon icon="ph:arrow-down" v-if="column.getIsSorted() === 'desc'" class="ml-2 h-4 w-4" />
                    <Icon icon="ph:arrow-up" v-else-if="column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
                    <Icon icon="ph:caret-up-down" v-else class="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-56 p-2">
                <DropdownMenuItem @click="column.toggleSorting(false)">
                    <Icon icon="ph:arrow-up" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort ascending
                </DropdownMenuItem>
                <DropdownMenuItem @click="column.toggleSorting(true)">
                    <Icon icon="ph:arrow-down" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort descending
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="column.toggleVisibility(false)">
                    <Icon icon="ph:eye" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Hide
                </DropdownMenuItem>
                <DropdownMenuItem @click="column.clearSorting()">
                    <Icon icon="ph:trash" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Clear Sort
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>

    <div v-else :class="$attrs.class">
        {{ title }}
    </div>
</template>
