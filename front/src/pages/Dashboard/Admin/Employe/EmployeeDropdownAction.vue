<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/core/stores/user.store'
import { MoreHorizontal } from 'lucide-vue-next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Button } from '@components/ui/button'

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
})

const userStore = useUserStore()

// Async component for update form
const Update = defineAsyncComponent(() => import('./DataTableColumnActions/Updatedepartement.vue'))

// State to show/hide update component
const isEditing = ref(false)

// Function to delete employee
const deleteEmployee = async () => {
  try {
    await userStore.deleteUser(props.employee.id)
  } catch (error) {
    console.error('Error deleting employee:', error)
  }
}

// Function to show the edit form
const editEmployee = () => {
  isEditing.value = true
}
</script>

<template>
  <div>
    <!-- Dropdown Menu -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem @click="deleteEmployee">Supprimer</DropdownMenuItem>
        <DropdownMenuItem @click="editEmployee">Éditer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Edit Modal (appears when isEditing is true) -->
    <div v-if="isEditing" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-lg font-bold mb-4">Modifier l'employé</h2>
        <Suspense>
          <Update :employee="props.employee" />
        </Suspense>
        <div class="flex justify-end mt-4">
          <Button variant="outline" @click="isEditing = false">Fermer</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <template>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem @click="editEmployee">Éditer</DropdownMenuItem>
        <DropdownMenuItem @click="deleteEmployee">Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </template>
  
  <script setup>
  import { MoreHorizontal } from 'lucide-vue-next'
  
  const props = defineProps({
    employee: {
      type: Object,
      required: true
    }
  })
  
  const employeeStore = useUserStore()
  
  const editEmployee = () => {
    router.push(`/edit-employee/${props.employee.id}`)
  }
  
  const deleteEmployee = async () => {
    await employeeStore.deleteEmployee(props.employee.id)
  }
  </script> -->