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
          <td class="p-2">{{ employee.name }}</td>
          <td class="p-2">{{ employee.email }}</td>
          <td class="p-2">{{ employee.role }}</td>
          <td class="p-2">
            <button class="sl-button sl-button--primary" @click="editEmployee(employee.id)">Éditer</button>
            <button class="sl-button sl-button--danger" @click="deleteEmployee(employee.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const employees = ref([])

async function fetchEmployees() {
  try {
    const response = await axios.get('/admin/employees')
    employees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
}

function editEmployee(id: number) {
  console.log('Edit employee with id:', id)
  // Add your edit logic here
}

function deleteEmployee(id: number) {
  console.log('Delete employee with id:', id)
  // Add your delete logic here
}

onMounted(fetchEmployees)
</script>

