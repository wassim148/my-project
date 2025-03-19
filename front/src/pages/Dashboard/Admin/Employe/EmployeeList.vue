<!-- <script setup lang="ts">
import { onMounted } from 'vue'
import { columns } from './columns'
import DataTable from './data-table.vue'
import useUserStore from '@/core/stores/user.store'
import { storeToRefs } from 'pinia'

const employeeStore = useUserStore()
const { employees } = storeToRefs(employeeStore)

onMounted(async () => {
  await employeeStore.fetchUsers()
})
</script>

<template>
  <DataTable :columns="columns" :data="employees" />
</template> -->
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/core/stores/user.store'
import DataTable from './data-table.vue'
import { columns } from './columns'

const userStore = useUserStore()
const employees = ref([])

onMounted(async () => {
  await userStore.fetchUsers()
  employees.value = userStore.users 
})
</script>

<template>
    <DataTable :columns="columns" :data="employees" />
</template>