<script setup lang="ts">
import { ref, computed, defineProps, defineAsyncComponent, watch } from 'vue'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import Search from './DataTableColumnActions/Search.vue'
import { Table } from '@tanstack/vue-table'
import { Employee } from './columns'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Sort from './DataTableColumnActions/Sort.vue'
import useUserStore from '@/core/stores/user.store'
import Select from '@components/ui/select/Select.vue'
import Datepicker from '@components/ui/datepicker/Datepicker.vue'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from '@components/ui/dropdown-menu'

interface DataTableToolbarProps {
  table: Table<Employee>
  copyKey: string
}

const Update = defineAsyncComponent(() => import('./DataTableColumnActions/Updatedepartement.vue'))
const employeeStore = useUserStore()
const props = defineProps<DataTableToolbarProps>()
const isLoading = ref(false)

const departments = ref(['IT', 'HR', 'Marketing', 'Sales', 'informatique'])
const projects = ref(['Project A', 'Project B', 'Project C'])
const periods = ref(['2024', '2023', '2022'])

const selectedDepartment = ref<string | null>(null)
const selectedProject = ref<string | null>(null)
const selectedPeriod = ref<string | null>(null)

const hasFilters = computed(() => {
  return selectedDepartment.value || selectedProject.value || selectedPeriod.value
})

const applyFilters = () => {
  props.table.getColumn('department')?.setFilterValue(selectedDepartment.value || '')
  props.table.getColumn('project')?.setFilterValue(selectedProject.value || '')
  props.table.getColumn('period')?.setFilterValue(selectedPeriod.value || '')
}

const resetFilters = () => {
  selectedDepartment.value = null
  selectedProject.value = null
  selectedPeriod.value = null
  applyFilters()
}

watch([selectedDepartment, selectedProject, selectedPeriod], applyFilters)

const refetchData = async () => {
  isLoading.value = true
  await employeeStore.fetchUsers({})
  isLoading.value = false
}
</script>

<template>
  <div class="flex justify-center items-center p-2 h-14 space-x-2 bg-secondary rounded-sm">
    <div class="flex justify-center space-x-2 items-center">
      <Button variant="ghost" size="icon">
        <Icon icon="ph:funnel-simple-bold" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="sm">
            <span>Filtrer</span>
            <Icon icon="ph:filter" class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="w-64 p-2">
          <p class="text-sm font-medium">Filtrer par :</p>
          <DropdownMenuSeparator />

          <DropdownMenuItem v-for="dept in departments" :key="dept" @click="selectedDepartment = dept">
            <Icon icon="ph:building" class="mr-2 h-4 w-4" />
            {{ dept }}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem v-for="proj in projects" :key="proj" @click="selectedProject = proj">
            <Icon icon="ph:briefcase" class="mr-2 h-4 w-4" />
            {{ proj }}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem v-for="period in periods" :key="period" @click="selectedPeriod = period">
            <Icon icon="ph:calendar" class="mr-2 h-4 w-4" />
            {{ period }}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem @click="resetFilters">
            <Icon icon="ph:trash" class="mr-2 h-4 w-4 text-red-500" />
            Réinitialiser les filtres
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sort :table="props.table" :keys="['id', 'email', 'role', 'department', 'project']" />
    </div>

    <div class="flex flex-grow items-center space-x-2">
      <Select v-model="selectedDepartment" :options="departments" placeholder="Filtrer par département" />
      <Select v-model="selectedProject" :options="projects" placeholder="Filtrer par projet" />
      <Datepicker v-model="selectedPeriod" placeholder="Filtrer par période" />

      <Button v-if="hasFilters" variant="ghost" class="text-xs h-8 px-2 lg:px-3" @click="resetFilters">
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
