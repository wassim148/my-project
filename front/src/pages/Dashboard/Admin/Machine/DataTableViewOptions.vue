<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import type { Machine } from './columns'

interface DataTableViewOptionsProps {
    table: Table<Machine>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() =>
    props.table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
)
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="ml-auto hidden h-8 lg:flex">
                <Icon icon="ph:gear" class="mr-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel>Toggle columns visibility</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
                v-for="column in columns"
                :key="column.id"
                class="capitalize"
                :checked="column.getIsVisible()"
                @update:checked="(value) => column.toggleVisibility(!!value)"
            >
                {{ column.id }}
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
