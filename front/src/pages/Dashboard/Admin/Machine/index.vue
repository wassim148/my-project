<script setup lang="ts">
import { onMounted } from 'vue'
import { columns } from './columns'
import DataTable from './data-table.vue'
import { storeToRefs } from 'pinia'
import { useMachineStore } from '@/core/stores'

const machineStore = useMachineStore()
const { machines } = storeToRefs(machineStore)
onMounted(async () => {
    await machineStore.getMachines({})
})
</script>

<template>
    <DataTable :columns="columns" :data="machines" />
</template>
