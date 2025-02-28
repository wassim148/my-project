<script lang="ts" setup>
import { Machine } from '../columns'
import Input from '@components/ui/input/Input.vue'
import { Icon } from '@iconify/vue'
import { TableSearchProps } from '@/shared/interfaces/table';



const props = defineProps<TableSearchProps<Machine>>()
</script>

<template>
    <div class="relative items-center">
        <Input
            :model-value="(props.table.getColumn(props.column)?.getFilterValue() as string) ?? ''"
            type="text"
            placeholder="Search..."
            class="pl-10"
            @input="props.table.getColumn(props.column)?.setFilterValue($event.target.value)"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Icon icon="ph:magnifying-glass" class="size-6 text-muted-foreground" />
        </span>
    </div>
</template>
