<script lang="ts" setup>
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@components/ui/command'
import StarButton from '@components/Buttons/StarButton.vue'
import ToggleDarkModeButton from '@components/Buttons/ToggleDarkModeButton.vue'
import useUserStore from '@/core/stores/user.store'
import { defineModel, ref, computed, onMounted } from 'vue'

const isLeftSidebarCollapsed = defineModel('isLeftSidebarCollapsed', { required: true, type: Boolean })
const isRightSidebarCollapsed = defineModel('isRightSidebarCollapsed', { required: true, type: Boolean })

const employees = ref([])
const userStore = useUserStore()

const fetchEmployees = async () => {
  try {
    await userStore.fetchUsers()
    employees.value = userStore.$state.users
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

const query = ref('')
const filteredEmployees = computed(() =>
    employees.value.filter((employee) =>
        employee.username.toLowerCase().includes(query.value.toLowerCase()) ||
        // employee.department.toLowerCase().includes(query.value.toLowerCase()) ||
        employee.role.toLowerCase().includes(query.value.toLowerCase())
    )
)

const selectEmployee = (employee) => {
    query.value = employee.name
}

onMounted(fetchEmployees)

</script>

<template>
    <div class="flex h-20 px-7 py-5 border-b items-center space-x-4">
        <div class="flex">
            <Button variant="ghost" size="icon" @click="() => (isLeftSidebarCollapsed = !isLeftSidebarCollapsed)">
                <Icon icon="ph:sidebar"></Icon>
            </Button>
            <StarButton></StarButton>
        </div>
        <div class="flex flex-grow items-center">
            <Breadcrumb class="hidden md:flex item-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink> {{ $route.meta.title }} Dachboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{{ $route.name }}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div class="flex flex-row justify-center space-x-4">
            <Command class="bg-accent rounded-lg border justify-center">
                <Popover>
                    <PopoverTrigger>
                        <CommandInput v-model="query" placeholder="Search employees..." />
                    </PopoverTrigger>
                    <PopoverContent>
                        <CommandList>
                            <CommandEmpty>No employees found.</CommandEmpty>
                            <CommandGroup heading="Employees">
                                <CommandItem
                                    v-for="employee in filteredEmployees"
                                    :key="employee.id"
                                    @click="() => selectEmployee(employee)"
                                >
                                    <span>{{ employee.username }} 
                                        <!-- ({{ employee.department }}) -->
                                    </span>
                                    <CommandShortcut>{{ employee.role }}</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </PopoverContent>
                </Popover>
            </Command>

            <div class="flex">
                <ToggleDarkModeButton />
                <Button
                    variant="ghost"
                    size="icon"
                    class="rotate-180"
                    @click="() => (isRightSidebarCollapsed = !isRightSidebarCollapsed)"
                >
                    <Icon icon="ph:sidebar"></Icon>
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon icon="ph:bell-duotone"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>
