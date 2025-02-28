<script setup lang="ts">
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import Separator from '@components/ui/separator/Separator.vue'
import Search from './DataTableColumnActions/Search.vue'
import { computed, defineAsyncComponent, ref } from 'vue'
import { Table } from '@tanstack/vue-table'
import { Machine } from './columns'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Delete from './DataTableColumnActions/Delete.vue'
import Copy from './DataTableColumnActions/Copy.vue'
import Sort from './DataTableColumnActions/Sort.vue'
import { useMachineStore } from '@/core/stores'
interface DataTableToolbarProps {
    table: Table<Machine>
    copyKey: string
}
const Create = defineAsyncComponent(() => import('./DataTableColumnActions/Create.vue'))

const machinesStore = useMachineStore()
const refetchData = async () => {
    isLoading.value = true
    await machinesStore.getMachines({})
    isLoading.value = false
}
const props = defineProps<DataTableToolbarProps>()
const columnNames: (keyof Machine)[] = ['description', 'name', 'quantity', 'price'] as const
const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
const isLoading = ref<Boolean>(false)
</script>

<template>
    <div class="flex justify-center items-center p-2 h-14 space-x-2 bg-secondary rounded-sm">
        <div class="flex justify-center space-x-2 items-center">
            <Suspense>
                <Create />
            </Suspense>
            <Button variant="ghost" size="icon">
                <Icon icon="ph:funnel-simple-bold" />
            </Button>
            <Sort :table="props.table" :keys="columnNames" />
        </div>
        <div class="flex flex-grow items-center space-x-2">
            <div class="flex items-center space-x-4">
                <Separator orientation="vertical" class="h-4 bg-secondary-foreground"></Separator>
                <div v-if="props.table.getSelectedRowModel().rows.length > 0">
                    <p class="text-xs">{{ props.table.getSelectedRowModel().rows.length }} Selected</p>
                </div>
            </div>
            <Delete :table="props.table" />

            <Copy :table="props.table" copy-key="code" />
            <Button
                v-if="isFiltered"
                variant="ghost"
                class="text-xs h-8 px-2 lg:px-3"
                @click="table.resetColumnFilters()"
            >
                <Icon icon="ph:funnel-x-duotone" class="text-destructive/70 mr-2 h-4 w-4" />
                <p class="text-destructive/70">Reset</p>
            </Button>
            <Button v-if="isLoading" variant="ghost" size="icon">
                <Icon icon="svg-spinners:270-ring-with-bg" class="h-5 w-5" />
            </Button>
            <div class="relative flex flex-row-reverse flex-grow h-5 items-center">
                <Search :table="props.table" column="name" />
            </div>
            <DataTableViewOptions :table="props.table" />
            <Button @click="refetchData" variant="ghost" size="icon">
                <Icon icon="ph:arrow-clockwise-bold" class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>
<style scoped></style>
