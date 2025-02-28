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
import type { Piece } from '../columns'
import { DataTableColumnSortProps } from '@/shared/interfaces/table'
import DropdownMenuLabel from '../../ui/dropdown-menu/DropdownMenuLabel.vue'
import Separator from '../../ui/separator/Separator.vue'

const props = defineProps<DataTableColumnSortProps<Piece>>()

const toggleSorting = (columnName: keyof Piece) => {
    if (props.table.getAllColumns()) {
        props.table
            .getColumn(columnName)
            ?.toggleSorting(props.table.getColumn(columnName)?.getIsSorted() == 'desc' ? false : true)
    }
}
</script>

<template>
    <div :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                    <Icon icon="ph:arrows-down-up" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-56 p-2">
                <DropdownMenuLabel> Sort </DropdownMenuLabel>
                <Separator orientation="horizontal"></Separator>
                <DropdownMenuItem
                    class="flex"
                    v-for="columnName in props.keys"
                    :key="columnName"
                    @click="toggleSorting(columnName)"
                >
                    <span class="flex-grow">
                        {{ columnName }}
                    </span>
                    <Icon
                        icon="ph:arrow-down"
                        v-if="props.table.getColumn(columnName)?.getIsSorted() === 'desc'"
                        class="ml-2 h-4 w-4"
                    />
                    <Icon
                        icon="ph:arrow-up"
                        v-else-if="props.table.getColumn(columnName)?.getIsSorted() === 'asc'"
                        class="ml-2 h-4 w-4"
                    />
                    <Icon icon="ph:caret-up-down" v-else class="ml-2 h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
