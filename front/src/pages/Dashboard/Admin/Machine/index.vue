<script setup lang="ts">
import { onMounted } from 'vue'
import { columns } from './columns'
import DataTable from './data-table.vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/core/stores/user.store'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
onMounted(async () => {
    await userStore.fetchUsers({})
})
</script>

<template>
    <DataTable :columns="columns" :data="users" />
</template>
