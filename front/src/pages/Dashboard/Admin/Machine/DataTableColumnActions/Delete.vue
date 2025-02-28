<script lang="ts" setup>
import { useMachineStore } from '@/core/stores'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { Machine } from '../columns'
import { DeleteProps } from '@/shared/interfaces/table'

const props = defineProps<DeleteProps<Machine>>()

const machineStore = useMachineStore()
</script>

<template>
    <Button
        variant="ghost"
        size="icon"
        @click="machineStore.bulkDeleteMachine(props.table.getSelectedRowModel().rows.map((row) => row.original))"
    >
        <Icon icon="ph:trash" class="text-destructive" />
    </Button>
</template>
