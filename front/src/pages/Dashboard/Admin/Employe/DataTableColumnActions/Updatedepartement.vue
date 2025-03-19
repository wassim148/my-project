<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, useUserStore } from '@/core/stores/user.store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Button } from '@/shared/components/ui/button'
import { useForm } from 'vee-validate'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Static arrays for departments and projects
const departments = ref(['IT', 'HR', 'Marketing', 'Sales', 'informatique'])
const projects = ref(['Project A', 'Project B', 'Project C'])

// Transform static arrays into objects with `id` and `name` properties
const departmentOptions = ref(
  departments.value.map((dept, index) => ({ id: `d${index + 1}`, name: dept }))
)
const projectOptions = ref(
  projects.value.map((proj, index) => ({ id: `p${index + 1}`, name: proj }))
)

// Define reactive variables
const employee = ref<User | null>(null)

// Initialize form with default values
const form = useForm({
  id: route.params.id as string,
  departmentId: '',
  projectIds: [] as string[],
})

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    // Fetch the selected user
    await userStore.fetchUsers(route.params.id as string)
    employee.value = userStore.selectedUser

    // Initialize form values if employee data exists
    if (employee.value) {
      form.departmentId = employee.value.departmentId
      form.projectIds = employee.value.projects.map((p) => p.id)
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

// Handle form submission
const onSubmit = async () => {
  try {
    if (!employee.value) {
      throw new Error('Employee data is missing')
    }

    // Update the user in the backend
    await userStore.updateUser(employee.value.id, {
      departmentId: form.departmentId,
      projectIds: form.projectIds,
    })

    router.push({ name: 'employee-list' })
  } catch (error) {
    console.error('Update failed:', error)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Modifier l'employé</h2>

    <Form @submit="onSubmit">
      <FormField name="departmentId" >
        <FormItem>
          <FormLabel>Département</FormLabel>
          <Select v-model="form.departmentId">
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="dept in departmentOptions"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Projects Field -->
      <FormField name="projectIds" >
        <FormItem>
          <FormLabel>Projets</FormLabel>
          <Select v-model="form.projectIds" multiple>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner des projets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="project in projectOptions"
                :key="project.id"
                :value="project.id"
              >
                {{ project.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <Button type="submit" class="mt-6">
        Mettre à jour
      </Button>
    </Form>
  </div>
</template>



<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, useUserStore } from '@/core/stores/user.store'
// import { useDepartmentStore } from '@/stores/department'
// import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Button } from '@/shared/components/ui/button'
import { useForm } from 'vee-validate'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
// const departmentStore = useDepartmentStore()
// const projectStore = useProjectStore()

// const { departments } = storeToRefs(userStore)
// const { projects } = storeToRefs(userStore)


const departments = ref(['IT', 'HR', 'Marketing', 'Sales', 'informatique'])
const projects = ref(['Project A', 'Project B', 'Project C'])
const employee = ref<User | null>(null)

const form = useForm({
  id: route.params.id as string,
  departmentId: '',
  projectIds: [] as string[],
})

// onMounted(async () => {
//   await Promise.all([
//     userStore.fetchUsers(route.params.id as string),
//     userStore.fetchDepartments(),
//     userStore.fetchProjects(),
//   ])
//   employee.value = userStore.selectedUser
//   form.departmentId = employee.value.departmentId
//   form.projectIds = employee.value.projects.map(p => p.id)
// })

const selectedDepartment = ref<string | null>(null)
const selectedProject = ref<string | null>(null)



const onSubmit = async () => {
  try {
    await userStore.updateUser(employee.value!.id, {
      departmentId: form.departmentId,
      projectIds: form.projectIds,
    })
    router.push({ name: 'employee-list' })
  } catch (error) {
    console.error('Update failed:', error)
  }
}


</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Modifier l'employé</h2>
    
    <Form @submit="onSubmit">
      <FormField name="departmentId" rules="required">
        <FormItem>
          <FormLabel>Département</FormLabel>
          <Select v-model="form.departmentId">
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="dept in departments" 
                :key="dept.id" 
                :value="dept.id"
              >
                {{ dept.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="projectIds" rules="required">
        <FormItem>
          <FormLabel>Projets</FormLabel>
          <Select v-model="form.projectIds" multiple>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner des projets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="project in projects" 
                :key="project.id" 
                :value="project.id"
              >
                {{ project.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="mt-6">
        Mettre à jour
      </Button>
    </Form>
  </div>
</template> -->
