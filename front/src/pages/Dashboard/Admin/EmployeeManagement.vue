<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Gestion des employés</h2>
    <table class="w-full border-collapse">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 text-left">Nom</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Rôle</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index" class="border-b">
          <td class="p-2">{{ employee.username }}</td>
          <td class="p-2">{{ employee.email }}</td>
          <td class="p-2">{{ employee.role }}</td>
          <td class="p-2 flex gap-2">
            <button class="sl-button sl-button--primary" @click="editEmployee(employee.id)">Éditer</button>
            <button class="sl-button sl-button--danger" @click="deleteEmployee(employee.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/core/stores/user.store'

const router = useRouter()
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

function editEmployee(id: number) {
  router.push(`/edit-employee/${id}`);
}

async function deleteEmployee(id: number) {
  try {
    await userStore.deleteUser(id);
    employees.value = employees.value.filter(employee => employee.id !== id);
    console.log('Employee deleted successfully.');
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
}

onMounted(fetchEmployees)
</script>

