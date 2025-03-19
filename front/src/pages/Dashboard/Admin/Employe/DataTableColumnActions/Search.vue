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
    CommandShortcut,
} from '@components/ui/command'
import StarButton from '@components/Buttons/StarButton.vue'
import ToggleDarkModeButton from '@components/Buttons/ToggleDarkModeButton.vue'
import useUserStore from '@/core/stores/user.store'
import { ref, computed, onMounted } from 'vue'

const isLeftSidebarCollapsed = ref(false)
const isRightSidebarCollapsed = ref(false)

const employees = ref([])
const query = ref('')
const userStore = useUserStore()

const fetchEmployees = async () => {
    try {
        await userStore.fetchUsers()
        employees.value = userStore.$state.users
    } catch (error) {
        console.error('Error fetching employees:', error)
    }
}

const filteredEmployees = computed(() =>
    employees.value.filter((employee) =>
        employee.username.toLowerCase().includes(query.value.toLowerCase()) ||
        employee.department.toLowerCase().includes(query.value.toLowerCase()) ||
        employee.role.toLowerCase().includes(query.value.toLowerCase())
    )
)

const selectEmployee = (employee) => {
    query.value = employee.username
}

onMounted(fetchEmployees)
</script>

<template>
    <div class="flex h-20 px-7 py-5 border-b items-center space-x-4">
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
                                    <span>{{ employee.username }} ({{ employee.department }})</span>
                                    <CommandShortcut>{{ employee.role }}</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </PopoverContent>
                </Popover>
            </Command>
        </div>
    </div>
</template>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>


<!-- <script lang="ts" setup>
import { Employee } from '../columns'
import Input from '@components/ui/input/Input.vue'
import { Icon } from '@iconify/vue'
import { TableSearchProps } from '@/shared/interfaces/table';
import { computed, defineProps, onMounted, ref } from 'vue';
import useUserStore from '@/core/stores/user.store';



const props = defineProps<TableSearchProps<Employee>>()
    const employees = ref([])
const userStore = useUserStore()

const fetchEmployees = async () => {
    try {
        await userStore.fetchUsers()
        await filterEmployees({ target: { value: '' } })
        employees.value = userStore.$state.users
    } catch (error) {
        console.error('Error fetching employees:', error)
    }
}

const filterEmployees = (e) => {
    const query = e.target.value.toLowerCase()
    if (query) {
        employees.value = userStore.$state.users.filter((user) =>
            user.username.toLowerCase().includes(query)
        )
    } else {
        employees.value = userStore.$state.users
    }
}

const query = ref('')
const filteredEmployees = computed(() =>
    employees.value.filter((employee) =>
        employee.username.toLowerCase().includes(query.value.toLowerCase()) ||
        employee.department.toLowerCase().includes(query.value.toLowerCase()) ||
        employee.role.toLowerCase().includes(query.value.toLowerCase())
    )
)

const selectEmployee = (employee) => {
    query.value = employee.name
}

onMounted(fetchEmployees)
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
        <!-- <div class="flex flex-row justify-center space-x-4">
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
                                        ({{ employee.department }})
                                    </span>
                                    <CommandShortcut>{{ employee.role }}</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </PopoverContent>
                </Popover>
            </Command>

            <!-- <div class="flex">
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
 -->
